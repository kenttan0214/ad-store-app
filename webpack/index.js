module.exports = function(args) {
	var env = require('./webpack-args')(args);
	var appEnv = require("../app/env")(env);
    var webpackLoaders = require('./webpack-loader')(appEnv);
    var webpackPlugins = require('./webpack-plugin')(appEnv);

    return {
        loaders: webpackLoaders,
        plugins: webpackPlugins,        
        appEnv: appEnv
    };
}