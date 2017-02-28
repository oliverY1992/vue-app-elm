var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var baseConfig = require('./base.conf');
var webpack = require('webpack');

var styleConfig = {
    fallback:'style-loader',
    use:[{
        loader:'css-loader',
        options:{
            sourceMap:true
        }
    },{
        loader:'postcss-loader',
        options:{
            plugins:function () {
                return [
                    require('autoprefixer')(['last 2 versions'])
                ]
            }
        }
    },{
        loader:'sass-loader',
        options:{
            outputStyle:'expanded',
            sourceMap:true
        }
    }]
};

module.exports = merge(baseConfig, {
    entry:{
        main:'./src/main.js',
        vendor:['vue', 'vuex', 'vue-router']
    },
    output:{
        filename:'[name].[chunkhash].min.js'
    },
    module:{
        rules:[{
            test:/\.scss/,
            exclude:/build/,
            use:ExtractTextPlugin.extract(styleConfig)
        },{
            test:/\.vue/,
            include:/node_modules|src/,
            exclude: /build/,
            loader:'vue-loader',
            options:{
                postcss: [
                    require('autoprefixer')({
                        browsers: [
                            'last 3 versions'
                        ]
                    })
                ],
                loaders:{
                    sass:ExtractTextPlugin.extract({
                        fallback:'vue-style-loader',
                        use:['css-loader','sass-loader']
                    })
                }
            }
        }]
    },
    plugins:[
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'manifest',
            chunks:['vendor']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});