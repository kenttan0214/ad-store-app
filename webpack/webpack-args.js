module.exports = function(args) {
    var environment = "";
    var environmentOpt = args.indexOf('--environment');

    if (environmentOpt != -1) {
        environment = args[environmentOpt + 1];
    }

    return environment;
}