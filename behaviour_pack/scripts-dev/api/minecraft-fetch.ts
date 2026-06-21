import {http, HttpHeader, HttpRequest, HttpRequestMethod,} from '@minecraft/server-net';
import {getAccessToken} from "./token";

const BASE_URL = 'http://nexuscore:8000';

const METHOD_MAP: Record<string, HttpRequestMethod> = {
    GET:    HttpRequestMethod.Get,
    POST:   HttpRequestMethod.Post,
    PUT:    HttpRequestMethod.Put,
    DELETE: HttpRequestMethod.Delete,
    HEAD:   HttpRequestMethod.Head,
};

export const minecraftFetch = async <T>(
    url: string,
    options: {
        method?: string;
        headers?: Record<string, string>;
        body?: string;
    } = {},
): Promise<T> => {
    const token = await getAccessToken();
    const request = new HttpRequest(`${BASE_URL}${url}`);

    request.method = METHOD_MAP[options.method?.toUpperCase() ?? 'GET'] ?? HttpRequestMethod.Get;

    request.headers = [
        new HttpHeader('Content-Type', 'application/json'),
        new HttpHeader('Authorization', `Bearer ${token}`),
        ...Object.entries(options.headers ?? {}).map(
            ([k, v]) => new HttpHeader(k, v)
        ),
    ];

    if (options.body) {
        request.body = options.body;
    }

    const response = await http.request(request);

    if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP ${response.status}: ${response.body}`);
    }

    // Bedrock returns a raw string body, no Response object
    return JSON.parse(response.body) as T;
};