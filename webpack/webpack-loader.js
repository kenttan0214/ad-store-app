var path = require('path');
var WebpackStrip = require('strip-loader');

module.exports = function(appEnv) {
    var loaders = [{
        test: [/\.js?$/],
        exclude: /node_modules/,
        loader: 'ng-annotate!babel?presets[]=es2015'
    }, {
        test: [/\.css$/],
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
    }, {
        test: /\.less$/,
        loader: 'style!css!less'
    }, {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        loader: "url?limit=10000"
    }, {
        test: /\.eot(\?.*)?$/,
        loader: "file"
    }, {
        test: /\.(woff|woff2|woff\?.*|woff2\?.*)$/,
        loader: "url?prefix=font/&limit=5000"
    }, {
        test: /\.ttf(\?.*)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
        test: /\.svg(\?.*)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
    }, {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader"
    }];

    if (appEnv.environment == 'pro') {
        loaders.push({
            test: [/\.js?$/, /\.es6?$/],
            exclude: /node_modules/,
            loader: WebpackStrip.loader('console.log')
        });
    }
    return loaders;
}