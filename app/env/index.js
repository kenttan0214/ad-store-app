module.exports = function(env) {
    var appEnv = require('./'.concat(env));
    appEnv.environment = env;
    return appEnv;
}