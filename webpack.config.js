const path = require('path')                                        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성, 우리는 그냥 시작만 하고싶지 귀찮게 index.html 파일까지 만들고 싶지 않다.!!

module.exports = {
    entry: ['babel-polyfill', './src/app.js'],                           
    output: {                                         
        path: path.join(__dirname, './webpack'),            
        filename: 'index.min.js'
    },
    module: {                                           
        rules: [
            {
                test: /\.(js|jsx)$/,                        
                exclude: /node_module/,                 
                use:{
                    loader: 'babel-loader'                
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'                // 생성한 템플릿 파일
        })
    ],

    devServer: {
        host : '127.0.0.1',
        contentBase: path.join(__dirname, "/"),
        compress: true,
        hot : true,
        inline: true,
        port: 9000,
        open : true
      }
}