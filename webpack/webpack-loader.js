var path = require('path');
var WebpackStrip = require('strip-loader');

module.exports = function(appEnv) {
    var loaders = [{
        test: [/\.js?$/],
        exclude: /node_modules/,
        use: ['ng-annotate-loader','babel-loader?presets[]=es2015']
    }, {
        test: [/\.css$/],
        exclude: /node_modules/,
        use: ['style-loader','css-loader']
    }, {
        test: /\.less$/,
        use: ['style-loader','css-loader','less-loader']
    }, {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        use: "url-loader?limit=10000"
    }, {
        test: /\.eot(\?.*)?$/,
        use: "file-loader"
    }, {
        test: /\.(woff|woff2|woff\?.*|woff2\?.*)$/,
        use: "url-loader?prefix=font/&limit=5000"
    }, {
        test: /\.ttf(\?.*)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
        test: /\.svg(\?.*)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml"
    }, {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader"
    }];

    if (appEnv.environment == 'pro') {
        loaders.push({
            test: [/\.js?$/, /\.es6?$/],
            exclude: /node_modules/,
            use: WebpackStrip.loader('console.log')
        });
    }
    return loaders;
}