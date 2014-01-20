

module.exports.development = {
		
	db : "mongodb://localhost/node",
		
	db_options : {
    	// db: { native_parser: true },
    	server: { poolSize: 10 }
    	// replset: { rs_name: 'myReplicaSetName' }
	}

};


module.exports.test = {

	db : "mongodb://localhost/node"

};


module.exports.production = {

	db : "mongodb://tiffany.fotodish.com/node"

};