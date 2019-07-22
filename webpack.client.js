const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/client/static/index.html",
});

module.exports = {
    entry: "./src/client/index.tsx",

    output: {
        path: path.resolve(__dirname, "dist/static"),
        filename: "client.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    mode: isProduction ? "production" : "development",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            }
        ]
    },

    plugins: [
        htmlWebpackPlugin
    ]
};