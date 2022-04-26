// 引入一个包
const path = require('path');
// 引入html插件
const htmlWenbpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    // 入口文件
    entry: "./src/index.ts",
    // 打包目录
    output: {
        // 指定打包的目录
        path: path.resolve(__dirname, "dist"),
        // 打包后的文件
        filename: "bundle.js"
    },

    // 指定weibpack打包使用的模块
    module: {
        // 指定加载的规则
        rules: [{
            test: /\.ts$/,
            //test指定规则生效的文件
            use: "ts-loader",
            // 要排除的文件夹
            exclude: /node-modules/
        }, {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                // 引入postcss
                // {
                //     loader: "postcss-loader",
                //     options: {
                //         postcssOptions: {
                //             plugins: [
                //                 "postcss-preset-env",
                //                 {
                //                     browsers: "last 2 versions"
                //                 }
                //             ]
                //         }
                //     }
                // },
                'less-loader'
            ]
        }]

    },
    // 配置webpack插件？、
    plugins: [
        new htmlWenbpackPlugin({
            // title: "runforest-yx"
            template: "./src/index.html"
        }),
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}