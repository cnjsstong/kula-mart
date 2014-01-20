var fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    restify = require('restify');

var env = process.env.NODE_ENV || 'development',
    config = require('./conf/' + env + '.local.config');

console.log('Running Mode: ', env);

require('./init/mongodb')(config);

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(models_path + '/' + file);
    }
});

server = restify.createServer({
	name: 'Kula-Server',
	version : '0.0.0'
});
require('./init/restify')(server);

var filePath = path.join(__dirname, "./controllers");
require('./init/router')(server, filePath);

var port = process.env.PORT || 3000;
server.listen(port);

console.log('Restify server listening on port ', port);




