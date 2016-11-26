var path = require('path');
var webpack = require("webpack");

var webpackModules = require("./webpack")(process.argv);
var dependency = require("./app/dependency");

var appEnv = webpackModules.appEnv;
var loaders = webpackModules.loaders;
var plugins = webpackModules.plugins;

var webpackConfig = {
    context: path.resolve('app'),
    entry: {
        jquery: dependency.jquery,
        bootstrap: dependency.bootstrap,
        angular: dependency.angular,
        angularDependency: dependency.angularDependency,
        vendors: dependency.vendors,
        app: './app'
    },
    output: {
        path: path.resolve('build'),
        filename: '[hash][id].js',
        chunkFilename: '[name][chunkhash][id].js',
        publicPath: appEnv.publicPath
    },
    devtool: "#eval",
    devServer: {
        progress: true,
        hot: true,
        inline: false,
        port: 9876,
        contentBase: 'app'
    },
    module: {
        loaders: loaders
    },
    plugins: plugins,
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        alias: {
            assets: path.resolve("app/assets"),
            style: path.join(__dirname, "app/assets/less"),
            components: path.resolve("app/components"),
            services: path.resolve("app/components/common-services")
        }
    },
    target: 'web'
};

if (appEnv.environment == 'pro') {
    delete webpackConfig ['devtool'];
    delete webpackConfig.output ['publicPath'];
}

module.exports = webpackConfig;