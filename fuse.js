const { FuseBox, WebIndexPlugin, CSSPlugin, CSSModulesPlugin, QuantumPlugin, CopyPlugin } = require("fuse-box");
const { context, task, src } = require("fuse-box/sparky");

const CLIENT_BUNDLE = "static/client";
const SERVER_BUNDLE = "main";

const isProduction = process.env.NODE_ENV === "production";

context(class {
    getClientConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            useTypescriptCompiler: true,
            plugins: [
                CSSModulesPlugin(),
                CSSPlugin(),
                WebIndexPlugin({
                    template: "src/client/static/index.html",
                    bundles: [
                        CLIENT_BUNDLE
                    ],
                    target: "static/index.html"
                }),
                isProduction && QuantumPlugin({
                    target: "browser",
                    bakeApiIntoBundle: CLIENT_BUNDLE
                })
            ]
        });
    }

    getServerConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            useTypescriptCompiler: true,
            target: "server@esnext",
            plugins: [
                isProduction && QuantumPlugin({
                    target: "server",
                    bakeApiIntoBundle: SERVER_BUNDLE
                })
            ]
        });
    }
});

task("clean", async () => {
    await src("./dist").clean("dist/").exec();
});

task("copy", async () => {
    await src("*.yml", { base: "src/server" }).dest("dist/").exec();
});

task("build", async context => {
    const client = context.getClientConfig();

    client.bundle(CLIENT_BUNDLE)
        .watch("client/**")
        .hmr()
        .instructions("> client/index.tsx");

    await client.run();

    const server = context.getServerConfig();

    server.bundle(SERVER_BUNDLE)
        .watch("server/**")
        .instructions("> [server/main.ts]")
        .completed(proc => proc.start());

    await server.run();
});

task("default", ["clean", "copy", "build"]);