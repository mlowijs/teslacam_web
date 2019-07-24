const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isProduction = process.env.NODE_ENV === "production";

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/client/static/index.html",
});

const dotenv = new Dotenv({
    path: isProduction ? "./src/client/.env" : "./src/client/.env.development"
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
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            hmr: !isProduction
                        }
                    },
                    "css-modules-typescript-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: !isProduction,
                            modules: true
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            }
        ]
    },

    plugins: [
        htmlWebpackPlugin,
        dotenv
    ],

    devServer: {
        port: 3001,
        hot: true
    }
};