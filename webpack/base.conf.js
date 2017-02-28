var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname, '..');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');

module.exports = {
    context:ROOT_PATH,
    output:{
        path:BUILD_PATH,
        publicPath:'/',
        filename:'[name].bundle.js'
    },
    resolve:{
        modules:[
            SRC_PATH,
            MODULES_PATH
        ],
        extensions:['*','.vue','.js','.css','.scss'],
        alias:{
            'vue$':'vue/dist/vue.common.js',
            'components':path.resolve(SRC_PATH, 'components'),
            'styles':path.resolve(SRC_PATH, 'styles'),
            'utils':path.resolve(SRC_PATH, 'utils'),
            'config':path.resolve(SRC_PATH,'config'),
            'services':path.resolve(SRC_PATH, 'services'),
            'pages':path.resolve(SRC_PATH, 'pages'),
            'store':path.resolve(SRC_PATH, 'store')
        }
    },
    module:{
        rules:[{
            test:/\.(vue|js)/,
            enforce:'pre',
            exclude:MODULES_PATH,
            include:SRC_PATH,
            loader:'eslint-loader'
        },{
            test:/\.js/,
            include:[MODULES_PATH, SRC_PATH],
            exclude:BUILD_PATH,
            loader:'babel-loader'
        }, {
            test:/\.(png|gif|jpg|jpeg)/,
            exclude:/node_modules|build/,
            include:/src/,
            loader:'url-loader',
            options:{
                limit:10240
            }
        },{
            test:/\.(svg|eot|woff2?|ttf|otf)/,
            loader:'url-loader',
            include:/src/,
            exclude:/node_modules|build/,
            options:{
                limit:10240
            }
        }]
    }
}