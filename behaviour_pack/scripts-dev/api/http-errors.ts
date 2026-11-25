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

export interface ConflictDetail {
    error?: string;
    status?: string;
    message?: string;
}

export class ConflictError extends HttpError {
    /** The parsed `detail` object from the response body, if it had one. */
    readonly detail: ConflictDetail | null;

    constructor(body: string) {
        super(409, body);
        this.name = 'ConflictError';

        let detail: ConflictDetail | null = null;
        try {
            const parsed = JSON.parse(body);
            if (parsed && typeof parsed.detail === 'object') detail = parsed.detail;
        } catch {
            // Not JSON, leave detail empty
        }
        this.detail = detail;
    }
}
