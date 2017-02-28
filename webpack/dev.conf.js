var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./base.conf');

module.exports = merge(baseConfig, {
    entry:{
        main:[
            'babel-polyfill',
            'webpack-hot-middleware/client?timeout=6000',
            './src/main.js'
        ]
    },
    devtool:'#eval-source-map',
    module:{
        rules:[{
            test: /\.scss$/,
            include:/node_modules|src/,
            exclude:/build/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [
                            require('autoprefixer')({
                                browsers: ['last 2 versions']
                            })
                        ]
                    }
                }
            }, {
                loader: 'sass-loader',
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true
                }
            }]
        },{
            test:/\.vue/,
            include:/node_modules|src/,
            exclude: /build/,
            loader:'vue-loader',
            options:{
                postcss:[require('autoprefixer')({
                    browsers: [
                        'last 2 versions'
                    ]
                })],
                loaders:{
                    sass: 'vue-style-loader!css-loader?sourceMap=true!sass-loader?sourceMap=true&outputStyle=expanded',
                }
            }
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            __DEVELOPMENT__:true,
            __CLIENT__:true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});

