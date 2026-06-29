if (typeof globalThis.URLSearchParams === 'undefined') {
    (globalThis as any).URLSearchParams = class URLSearchParams {
        private params: Array<[string, string]> = [];

        constructor(init?: string | Record<string, string> | Array<[string, string]>) {
            if (!init) return;
            if (typeof init === 'string') {
                init.replace(/^\?/, '').split('&').forEach(pair => {
                    const [k, v] = pair.split('=');
                    if (k) this.params.push([decodeURIComponent(k), decodeURIComponent(v ?? '')]);
                });
            } else if (Array.isArray(init)) {
                this.params = init.map(([k, v]) => [k, v]);
            } else {
                this.params = Object.entries(init);
            }
        }

        append(key: string, value: string) { this.params.push([key, value]); }
        delete(key: string) { this.params = this.params.filter(([k]) => k !== key); }
        get(key: string) { return this.params.find(([k]) => k === key)?.[1] ?? null; }
        getAll(key: string) { return this.params.filter(([k]) => k === key).map(([, v]) => v); }
        has(key: string) { return this.params.some(([k]) => k === key); }
        set(key: string, value: string) { this.delete(key); this.params.push([key, value]); }
        toString() {
            return this.params
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join('&');
        }
        forEach(cb: (value: string, key: string) => void) {
            this.params.forEach(([k, v]) => cb(v, k));
        }
    };
}