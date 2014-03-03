
var isEmail = require('validator').isEmail;


exports.checkEmailFormat =  function email_validator (email) {
    return isEmail(email);
};

