const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ['./src/index.html'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // {
            //     test: /\.html$/i,
            //     loader: "html-loader",
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/i,
            //     type: 'asset/resource',
            // },
        ],
    },
};