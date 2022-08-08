const path = require('path'); //path 라이브러리 불러오기
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const { merge } = require('webpack-merge');
require('@babel/polyfill');
module.exports = {
    resolve: {
        extensions: ['.js', '.css', '.scss'], //확장자 명칭을 생략 가능한 것들을 설정해준다!
        alias: { // 별칭을 써줌으로써 절대경로를 설정해준다!
            '@': path.join(__dirname, 'src'),
        },
    },
    entry: {
      "all.min": ['@babel/polyfill', path.join(__dirname, '/src/app.js')],
      "Actives.min": ['@babel/polyfill', path.join(__dirname, '/src/js/Actives/index.js')],
      "MoreViews.min": ['@babel/polyfill', path.join(__dirname, '/src/js/MoreViews/index.js')],
      "Counter.min": ['@babel/polyfill', path.join(__dirname, '/src/js/Counter/index.js')],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', { modules: false, useBuiltIns: 'entry', corejs: 3, shippedProposals: true, targets: { browsers: ['last 3 versions', 'ie >= 11'] } }]],
                  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods'],
                },
            },
            {  // scss 또는 css loader
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',              // style-loader는 읽어들인 내용을 html에 추가해줍니다. 2)
                    use: ['css-loader', 'sass-loader']    // css-loader와 sass-loader는 app.js에서 css 내용을 읽어들이고, 1)
                })
            },
            { // images css에서 background-image 속성 loader
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                          name: '[path][name].[ext]',
                      }
                    }
                ]
            },
            { // fonts loader
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: url => `../fonts/${url}`
                      }
                    }
                ]
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), //이전 dist 빌드 폴더안에 파일을 지워주는 플러그인
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: './' }
            ]
        })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd', // 라이브러리 타겟 설정
        library: 'tr', // 라이브러리 네임스페이스 설정
    }
}