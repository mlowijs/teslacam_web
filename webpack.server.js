const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/server/main.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    mode: isProduction ? "production" : "development",
    target: "node",

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/server/config.yml", to: "config.yml"}
        ])
    ],

    node: {
        __dirname: false
    },

    externals: [nodeExternals()]
};