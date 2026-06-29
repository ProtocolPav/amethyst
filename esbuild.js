const esbuild = require("esbuild");

const external = [
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-gametest",
    "@minecraft/server-net",
    "@minecraft/server-common",
    "@minecraft/server-editor",
    "@minecraft/debug-utilities",
];

const start = performance.now();

console.log("⛏  Bundling Amethyst Behaviour Pack...\n");

esbuild.build({
    entryPoints: ["behaviour_pack/scripts-dev/main.ts"],
    outfile: "behaviour_pack/scripts/main.js",
    bundle: true,
    minify: false,
    format: "esm",
    external,
    keepNames: true,
    metafile: true,
}).then((result) => {
    const elapsed = (performance.now() - start).toFixed(0);
    const output = Object.entries(result.metafile.outputs)[0];
    const sizeKb = (output[1].bytes / 1024).toFixed(1);

    console.log(`  ✔  main.js  ${sizeKb} kb`);
    console.log(`\n✅  Done in ${elapsed}ms`);
}).catch((error) => {
    console.error("\n❌  Build failed:\n");
    console.error(error.message ?? error);
    process.exit(1);
});