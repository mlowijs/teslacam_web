const { FuseBox, WebIndexPlugin, CSSPlugin, CSSModulesPlugin } = require("fuse-box");
const { context, task, src } = require("fuse-box/sparky");

const CLIENT_BUNDLE = "static/client";
const SERVER_BUNDLE = "main";

context({
    config: FuseBox.init({
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
            })
        ]
    }),

    copyConfig: () => {
    }
});

task("clean", context => {
    src("./dist").clean("dist/").exec();
});

task("copyConfig", context => {
    src("config.yml", { base: "src/server" }).dest("./dist").exec();
});

task("build", context => {
    const fuse = context.config;

    fuse.bundle(CLIENT_BUNDLE)
        .watch("client/**")
        .hmr({ reload: true })
        .instructions("> client/index.tsx");

    fuse.bundle(SERVER_BUNDLE)
        .watch("server/**")
        .instructions("> [server/main.ts]")
        .completed(proc => proc.start());

    fuse.run();
});

task("default", ["clean", "build", "copyConfig"]);