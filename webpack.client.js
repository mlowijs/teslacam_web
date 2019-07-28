const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === "production";

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/client/static/index.html",
});

const dotenv = new Dotenv({
    path: isProduction ? "./src/client/.env" : "./src/client/.env.development"
});

const extractText = new MiniCssExtractPlugin({
    filename: "[name].bundle.css"
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
                test: /\.min\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-modules-typescript-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: !isProduction,
                            modules: true
                        }
                    }
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
        dotenv,
        extractText
    ],

    devServer: {
        port: 3001,
        hot: true
    }
};