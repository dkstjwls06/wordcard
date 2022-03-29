const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const arr = [];
// const getHTML = (url) => {
//     const dir = fs.readdirSync(path.resolve(__dirname, url));
//     for(let i of dir){
//         if(i.search(/\.html$/) !== -1){
//             arr.push([url, i]);
//         } else if(i.search(/\./) === -1){
//             getHTML(`${url}/${i}`);
//             console.log(i);
//         }
//     }
// };
// getHTML('src');
// const plugins = [];
// for(let i of arr){
//     plugins.push(new HtmlWebpackPlugin({
//         template:`./${i[0]}/${i[1]}`,
//         filename:i[1],
//         chunks:[i[1].replace('.html', '')]
//     }));
// }

module.exports = {
    entry: { // 파일 시작점 지정
        index: './src/index.ts',// -> 이 파일부터 시작
        'login/addid': './src/login/addid.ts',
        'login/login':'./src/login/login.ts',
        'login/mail':'./src/login/mail.ts',
        'login/mailComplete':'./src/login/mailComplete.ts',
        admin:'./src/admin.ts',
        modify:'./src/modify.ts',
        practice:'./src/practice.ts',
        id:'./src/id.ts',
        error:'./src/error.ts',
        support:'./src/support.ts',
        share:'./src/share.ts',
        prepexam:'./src/prepexam.ts',
        exam:'./src/exam.ts'
    },
    devtool: 'inline-source-map',
    mode:'development',
    module: {//convert ts to js
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader', // -> 모듈
                exclude: /node_modules/,
                //js로 일단 바꾼뒤 동작!
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[contenthash].[ext]'
                }
            }
            // {
            //     test: /\.(scss|css)$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 publicPath: ''
            //             }
            //         },
            //         "css-loader", 
            //         "sass-loader"
            //     ]
            // }
        ],
    },
    optimization: {//최적화
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: { // 확장자 확인
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: { // 이곳에 맞추어 결과물 생성
        filename: '[name].js', // 확장자
        path: path.resolve(__dirname, 'dist'), // 경로
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/login/login.html',
            filename: './login/login.html',
            chunks:['login/login']
        }),
        new HtmlWebpackPlugin({
            template:'./src/login/addid.html',
            filename: './login/addid.html',
            chunks:['login/addid']
        }),
        new HtmlWebpackPlugin({
            template:'./src/login/mail.html',
            filename: './login/mail.html',
            chunks:['login/mail']
        }),
        new HtmlWebpackPlugin({
            template:'./src/login/mailComplete.html',
            filename: './login/mailComplete.html',
            chunks:['login/mailComplete']
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename: './index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template:'./src/admin.html',
            filename: './admin.html',
            chunks:['admin']
        }),
        new HtmlWebpackPlugin({
            template:'./src/modify.html',
            filename: './modify.html',
            chunks:['modify']
        }),
        new HtmlWebpackPlugin({
            template:'./src/practice.html',
            filename: './practice.html',
            chunks:['practice']
        }),
        new HtmlWebpackPlugin({
            template:'./src/error.html',
            filename:'./error.html',
            chunks:['error']
        }),
        new HtmlWebpackPlugin({
            template:'./src/support.html',
            filename:'./support.html',
            chunks:['support']
        }),
        new HtmlWebpackPlugin({
            template:'./src/share.html',
            filename:'./share.html',
            chunks:['share']
        }),
        new HtmlWebpackPlugin({
            template:'./src/prepexam.html',
            filename:'./prepexam.html',
            chunks:['prepexam']
        }),
        new HtmlWebpackPlugin({
            template:'./src/exam.html',
            filename:'./exam.html',
            chunks:['exam']
        }),-
        new HtmlWebpackPlugin({
            template:'./src/examresult.html',
            filename:'./examresult.html',
            chunks:['examresult']
        })
    ],
    devServer:{
        contentBase:`${__dirname}/dist`,
        inline:true,
        
        hot:true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:4000',
                changeOrigin: true,
                secure: false
            },
            '/socket.io' : {
                target: 'http://127.0.0.1:4000',
                ws: true,
                changeOrigin: true,
                secure: false
            }
        },
        host: '127.0.0.1',
        port: 4500
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.webpack_cache')
    },
};