const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') 

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        assetModuleFilename: '[name][ext]',
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ['css-loader', 'style-loader']
            },
            {
                test: /\.(scss)$/,
                use: [{
                  // inject CSS to page
                  loader: 'style-loader'
                }, {
                  // translates CSS into CommonJS modules
                  loader: 'css-loader'
                }, {
                  // Run postcss actions
                  loader: 'postcss-loader',
                }, {
                  // compiles Sass to CSS
                  loader: 'sass-loader'
                }]
              },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                }
            }, 
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html',
        })
    ]
}





