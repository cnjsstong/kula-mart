var fs = require('fs'),
    path = require('path'),
    httpMethod = require('../enums/http'),
    security = require('../lib/security');

module.exports = function (server, filePath) {
    fs.readdirSync(filePath).forEach(function (name) {
        if (!endsWith(name, '.js')) {
            return;
        }
        var controller = require(path.join(filePath, name));
        var base = controller.base;
        var routes = controller.routes;
        if (typeof base === 'string' && typeof routes !== "undefined" && Array.isArray(routes)) {
            routes.forEach(function (route) {
                var url = '/' + base + '/' + route.path;
                var middleware = [];
                if (httpMethod.METHODS.indexOf(route.method) !== -1) {
                    if (route.roles && Array.isArray(route.roles)) {
                        middleware.push(security.requireRoles(route.roles));
                    }
                    var options = {
                        path: url
                    }
                    if (route.version) {
                        options.version = route.version;
                    }
                    server[route.method](options, middleware, route.handler);
                }
            });
        }
    });
};

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
