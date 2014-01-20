
var mongoose = require('mongoose');

module.exports = function (config) {
	mongoose.connect(config.db, config.db_options);
	console.log('Connect to mongodb: ', config.db, ' | Options: ',config.db_options);
}