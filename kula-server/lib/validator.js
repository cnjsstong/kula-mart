
var check = require('validator').check;


exports.checkEmailFormat =  function email_validator (email) {
    try{
        check(email).isEmail();
    } catch (err){
        return false;
    }
    return true;
};

