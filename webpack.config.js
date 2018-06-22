const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'none',
    devtool: 'source-map',
    entry: {
        tree: './src/index.js',
        'tree.min': './src/index.js',
    },
    output: {
        filename: '[name].js',
        libraryExport: 'default',
        library: 'Tree',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJSPlugin({
                include: /\.min\.js$/,
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false,
                        drop_console: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
        }),
        new webpack.BannerPlugin(
            'treejs\n@version 1.5.0\n@see https://github.com/daweilv/treejs'
        ),
    ],
};
