const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const setMPA = () => {
    const entry = {}
    const HtmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/) 
        const pageName = match && match[1]
        entry[pageName] = entryFile 
        HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }))
    })
    return {
        entry,
        HtmlWebpackPlugins
    }
}

const { entry, HtmlWebpackPlugins } = setMPA()


module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300, // 等待时间，300ms后执行
    //     poll: 1000  // 轮询周期
    // },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [   // 链式调用，从右到左
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [  
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpeg|jpg|gif)$/,
                use: [  
                    'file-loader'
                ]   
            },
            // {
            //     test: /\.(png|svg|jpeg|jpg|gif)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10240
            //         }
            //     }]   
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [  
                    'file-loader'
                ]   
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,//服务器压缩
        hot: true,
        open: true,
        port: 8080,
        stats: 'errors-only',
    },
    plugins: [
        new CleanWebpackPlugin()
    ].concat(HtmlWebpackPlugins),
    devtool: 'cheap-source-map'
}