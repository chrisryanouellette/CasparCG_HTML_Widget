'use strict';

const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.scss', '.js']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'dev.js'
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{
                loader: "ts-loader"
            }]
        }, {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }, {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
        }]
    },
    plugins: [
        new HWP({
            template: 'src/index.html'
        })
    ],
    devServer: {
        port: 3000,
        open: false
    }
}