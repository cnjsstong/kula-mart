var restify = require('restify');
var security = require('../lib/security');
var crossdomain = require('../lib/crossdomain');

module.exports = function (server) {
    server.on('MethodNotAllowed', crossdomain.unknownMethodHandler);
	server.use(restify.queryParser());
	server.use(restify.bodyParser());
	server.use(security.auth());
	server.use(crossdomain.cors);
}