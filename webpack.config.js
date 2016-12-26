module.exports = function(env) {
    var path = require('path');
    var webpack = require("webpack");

    var webpackModules = require("./webpack")(env);
    var dependency = require("./app/dependency");

    var appEnv = webpackModules.appEnv;
    var rules = webpackModules.rules;
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
            port: 9876,
            contentBase: 'app'
        },
        module: {
            rules: rules
        },
        plugins: plugins,
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js'],
            alias: {
                assets: path.resolve("app/assets"),
                style: path.join(__dirname, "app/assets/less"),
                components: path.resolve("app/components"),
                services: path.resolve("app/components/common-services"),
                env: path.resolve("app/env")
            }
        },
        resolveLoader: {
            moduleExtensions: ["-loader"]
        },
        performance: {
            hints: false
        },
        target: 'web'
    };

    if (appEnv.environment == 'pro') {
        delete webpackConfig['devtool'];
        delete webpackConfig.output['publicPath'];
    }
    return webpackConfig;
}