const { FuseBox, WebIndexPlugin, CSSPlugin, CSSModulesPlugin, QuantumPlugin } = require("fuse-box");
const { context, task, src } = require("fuse-box/sparky");

const CLIENT_BUNDLE = "static/client";
const SERVER_BUNDLE = "main";

const isProduction = process.env.NODE_ENV === "production";

context({
    clientConfig: FuseBox.init({
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
    }),

    serverConfig: FuseBox.init({
        homeDir: "src",
        output: "dist/$name.js",
        useTypescriptCompiler: true,
        plugins: [
            isProduction && QuantumPlugin({
                target: "server",
                bakeApiIntoBundle: SERVER_BUNDLE
            })
        ]
    })
});

task("clean", context => {
    src("./dist").clean("dist/").exec();
});

task("copyConfig", context => {
    src("config.yml", { base: "src/server" }).dest("./dist").exec();
});

task("build", context => {
    

    context.clientConfig.bundle(CLIENT_BUNDLE)
        .watch("client/**")
        .hmr({ reload: true })
        .instructions("> client/index.tsx");

    context.serverConfig.bundle(SERVER_BUNDLE)
        .watch("server/**")
        .instructions("> [server/main.ts]")
        .completed(proc => proc.start());

    context.serverConfig.run();
    context.clientConfig.run();
});

task("default", ["copyConfig", "build"]);