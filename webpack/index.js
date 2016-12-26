module.exports = function(args) {
	var env = args.environment;
	var appEnv = require("../app/env")(env);
    var webpackRules = require('./webpack-loader')(appEnv);
    var webpackPlugins = require('./webpack-plugin')(appEnv);

    return {
        rules: webpackRules,
        plugins: webpackPlugins,        
        appEnv: appEnv
    };
}