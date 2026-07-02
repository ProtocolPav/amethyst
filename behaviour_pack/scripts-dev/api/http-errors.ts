export class HttpError extends Error {
    constructor(status: number, body: string) {
        super(`HTTP ${status}: ${body}`);
        this.name = 'HttpError';
    }
}

export class NotFoundError extends HttpError {
    constructor(body: string) {
        super(404, body);
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends HttpError {
    constructor(body: string) {
        super(401, body);
        this.name = 'UnauthorizedError';
    }
}