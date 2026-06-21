import { secrets } from '@minecraft/server-admin';
import {http, HttpHeader, HttpRequest, HttpRequestMethod} from "@minecraft/server-net";

const BASE_URL = 'http://nexuscore:8000';

// --- Token cache ---
let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

export async function getAccessToken(): Promise<string> {
    if (cachedToken && Date.now() < tokenExpiresAt) {
        return cachedToken;
    }

    const clientId     = secrets.get('NEXUSCORE_CLIENT_ID');
    const clientSecret = secrets.get('NEXUSCORE_CLIENT_SECRET');

    const request = new HttpRequest(`${BASE_URL}/api/oauth/token`);
    request.method = HttpRequestMethod.Post;
    request.headers = [new HttpHeader('Content-Type', 'application/x-www-form-urlencoded')];
    request.body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    const response = await http.request(request);

    if (response.status !== 200) {
        throw new Error(`OAuth token fetch failed: ${response.status}`);
    }

    const data = JSON.parse(response.body) as { access_token: string; expires_in: number };

    cachedToken = data.access_token;
    // Subtract 30s buffer so we refresh slightly before actual expiry
    tokenExpiresAt = Date.now() + (data.expires_in - 30) * 1000;

    return cachedToken;
}