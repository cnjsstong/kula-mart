var mongoose = require('mongoose');
var Account = mongoose.model('Account');

exports.auth = function () {
    return function (req, res, next) {
        var authHeader = req.header('KulaAuth');
//        console.log(authHeader);
        if (typeof authHeader === 'string') {
            var authArray = authHeader.split(' ');
            if (authArray.length === 2) {
                var username = authArray[0];
                var token = authArray[1];
                Account.authenticate(username, token, function (err, account) {
                    if (!err) {
                        req.account = account;
                    }
                    next();
                });
                return;
            }
        }
        next();
    }
};

exports.requireRoles = function (roles) {
    return function (req, res, next) {
        var account = req.account;
        if (account && roles.indexOf(req.account.type) !== -1) {
            next();
        } else {
            res.send(401, "Sorry, you can't access our secret garden.");
        }
    };
};