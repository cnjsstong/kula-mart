module.exports = {
	db : "mongodb://inori.sj.gs/kula",

	db_options : {
    	server: { poolSize: 10 }
	},

	tokenLength : 32,

	email_options : {
		account : '',
		password : '',
		sendTo : ''
	}
};