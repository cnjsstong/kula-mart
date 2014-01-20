
module.exports = {
	
	db : 'mongodb://mily.fotodish.com:28007/fotodish,macy.fotodish.com:28007/fotodish,melody.fotodish.com:28007/fotodish',

	db_options : {
    	server: { poolSize: 50 },
    	replset: { rs_name: 'fotodish' }
	},

	tokenLength : 32,

	restaurantPage : 100,

	searchPage : 10,

	latestNumber : 20,


	email_options : {

		account : 'albert@farseerinc.com',
		
		password : 'farseer2014',

		sendTo : 'feedback@fotodish.com'
	}

};
