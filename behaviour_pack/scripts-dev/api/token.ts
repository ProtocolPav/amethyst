import { secrets } from '@minecraft/server-admin';
import {http, HttpHeader, HttpRequest, HttpRequestMethod} from "@minecraft/server-net";

const BASE_URL = 'http://nexuscore:8000/api';

// --- Token cache ---
let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

export async function getAccessToken(): Promise<string> {
    if (cachedToken && Date.now() < tokenExpiresAt) {
        return cachedToken;
    }

    // Should be in the form:
    // Basic base64(<CLIENT_ID>:<CLIENT_SECRET>)
    const clientCredentials = secrets.get('NEXUSCORE_CLIENT_CREDENTIALS_B64');

    const request = new HttpRequest(`${BASE_URL}/auth/token`);
    request.method = HttpRequestMethod.Post;
    request.headers = [
        new HttpHeader('Content-Type', 'application/x-www-form-urlencoded'),
        new HttpHeader('Authorization', clientCredentials ? clientCredentials : ''),
    ];
    request.body = new URLSearchParams({ grant_type: 'client_credentials' }).toString();

    const response = await http.request(request);

    if (response.status !== 200) {
        throw new Error(`OAuth token fetch failed: ${response.status} ${response.body}`);
    }

    const data = JSON.parse(response.body) as { access_token: string; expires_in: number };

    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in - 30) * 1000;

    return cachedToken;
}