const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const production = env.production;

    return {
        entry: {
            index: './src/pages/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: production ? "scripts/[name].[contenthash].js"
            :"scripts/[name].js"
        },
        mode: 'development',
        devtool: 'eval-source-map',
        devServer: {
            static: path.resolve(__dirname, './dist'),
            compress: true,
            port: 8080,
            hot: true,
            open: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "images/[hash][ext][query]"
                    }
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "font/[hash][ext][query]"
                    }
                },
                {
                    // регулярное выражение, которое ищет все js файлы
                    test: /\.js$/,
                    // при обработке этих файлов нужно использовать babel-loader
                    use: 'babel-loader',
                    // исключает папку node_modules, файлы в ней обрабатывать не нужно
                    exclude: '/node_modules/'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: production 
                ? "styles/[name].[contenthash].css"
                :"styles/[name].css"
            })
        ]

    }
}
