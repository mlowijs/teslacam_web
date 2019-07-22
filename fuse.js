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
            plugins: [
                CopyPlugin({
                    files: ["server/config.yml"],
                    dest: ".",
                    resolve: "dist",
                    useDefault: false
                }),
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

task("copyConfig", async () => {
    await src("config.yml", { base: "src/server" }).dest("./dist").exec();
});

task("build", async context => {
    const server = context.getServerConfig();
    const client = context.getClientConfig();

    server.bundle(SERVER_BUNDLE)
        .watch("server/**")
        .instructions("> [server/main.ts]")
        .completed(proc => proc.start());

    await server.run();

    client.bundle(CLIENT_BUNDLE)
        .watch("client/**")
        .hmr({ reload: true })
        .instructions("> client/index.tsx");

    await client.run();
});

task("default", ["clean", "build"]);