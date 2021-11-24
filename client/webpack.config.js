const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'MathBattle'
            template: path.resolve(__dirname, 'src/index.html'),
            inject: 'head',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'static'),
                    to: path.resolve(__dirname, '../dist/static')
                }
            ]
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        watchContentBase: true,
        open: true,
        historyApiFallback: {
            index: '/'
        }
    }
};
