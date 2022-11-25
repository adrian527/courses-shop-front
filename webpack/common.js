const path = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path(__dirname, '..', 'src', 'index.js')
    },
    output: {
        filename: '[name].[contenthash:6].js',
        path: path(__dirname, '..', 'build'),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: `
            <!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kursy</title>
</head>

<body>
    <noscript>Przepraszamy Twoja przeglądarka nie wspiera JavaScript</noscript>
    <div id="root"></div>
</body>

</html>
            `
        })
    ]
}