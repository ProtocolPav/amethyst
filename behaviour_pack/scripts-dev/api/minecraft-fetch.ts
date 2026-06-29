import {http, HttpHeader, HttpRequest, HttpRequestMethod} from '@minecraft/server-net';
import {getAccessToken} from "./token";
import {HttpError, NotFoundError, UnauthorizedError} from "./http-errors";

const BASE_URL = 'http://nexuscore:8000/api';

const METHOD_MAP: Record<string, HttpRequestMethod> = {
    GET: HttpRequestMethod.Get,
    POST: HttpRequestMethod.Post,
    PUT: HttpRequestMethod.Put,
    PATCH: HttpRequestMethod.Put,
    DELETE: HttpRequestMethod.Delete,
    HEAD: HttpRequestMethod.Head,
};

export const minecraftFetch = async <T>(
    url: string,
    options: RequestInit = {},
): Promise<T> => {
    const token = await getAccessToken();
    const request = new HttpRequest(`${BASE_URL}${url}`);

    request.method = METHOD_MAP[(options.method ?? 'GET').toUpperCase()] ?? HttpRequestMethod.Get;

    let extraHeaders: Array<[string, string]> = [];
    if (options.headers) {
        if (Array.isArray(options.headers)) {
            extraHeaders = options.headers as Array<[string, string]>;
        } else {
            extraHeaders = Object.entries(options.headers as Record<string, string>);
        }
    }

    request.headers = [
        new HttpHeader('Content-Type', 'application/json'),
        new HttpHeader('Authorization', `Bearer ${token}`),
        ...extraHeaders.map(([k, v]) => new HttpHeader(k, v)),
    ];

    if (options.body) {
        request.body = options.body.toString();
    } else if (request.method === HttpRequestMethod.Delete) {
        request.body = '';
    }

    const response = await http.request(request);

    if (response.status < 200 || response.status >= 300) {
        switch (response.status) {
            case 404: throw new NotFoundError(response.body);
            case 401: throw new UnauthorizedError(response.body);
            default:  throw new HttpError(response.status, response.body);
        }
    }

    // Bedrock returns a raw string body, no Response object
    return JSON.parse(response.body) as T;
};