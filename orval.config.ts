import { defineConfig } from 'orval';

export default defineConfig({
    nexuscore: {
        input: 'http://localhost:8000/api/openapi.json',
        output: {
            mode: 'tags-split',
            target: './behaviour_pack/scripts-dev/api/nexuscore/client.ts',
            schemas: './behaviour_pack/scripts-dev/api/nexuscore/model',
            client: 'fetch',
            clean: true,
            override: {
                fetch: {
                    includeHttpResponseReturnType: false,
                },
                mutator: {
                    path: './behaviour_pack/scripts-dev/api/minecraft-fetch.ts',
                    name: 'minecraftFetch',
                },
            },
        },
    },
});