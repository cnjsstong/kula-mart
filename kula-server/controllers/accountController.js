var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    validator = require('../lib/validator'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID,
    bcrypt = require('bcrypt-nodejs'),
    salt = bcrypt.genSaltSync(),
    tokenGenerator = require('crypto');

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Account = mongoose.model('Account');

/*
 * Load balancer test alive   
 */
function alive(req, res) {
    res.send(200);
}

/*
 * Account login 
 */
function login(req, res) {

    if (req.body.email != null && req.body.password != null) {

        if (validator.checkEmailFormat(req.body.email)) {

            var query = { email: req.body.email };

            var projection = { email: 1, password: 1, username: 1, facebookId: 1, token: 1, status: 1, type: 1};

            Account.findOne(query, projection, function (err, account) {

                if (err) {
                    return res.send(404, 'Account not found');
                }

                if (account.status != Account.Status.ACTIVE) {
                    return res.send(403, 'Account is not active');
                }

                if (account.type > role.CUSTOMER) {
                    return res.send(403, 'Unauthorized account role');
                }

                if (!bcrypt.compareSync(req.body.password, account.password)) {
                    return res.send(403, 'Password does not match');
                }

                tokenGenerator.randomBytes(config.tokenLength, function (ex, buf) {

                    // account reset token
                    account.token = buf.toString('hex');

                    // update account
                    var condition = { _id: account._id };

                    var update = { token: account.token};

                    Account.update(condition, update, function (err) {

                        if (err) {
                            return res.send(404, 'Update Failed');
                        }

                        // return result
                        return res.send(200, account.securityMapping());

                    }); // end: updateAccount

                });// end: tokenGenerator

            }); // end: findAccount

        } else {
            return res.send(400, 'Invalid Email Format');
        }

    } else {
        // Bad Request
        return res.send(400, 'Bad Request');
    }
}


function signup(req, res) {
    Account.createAccount(req.body, function (err, acc) {
        if (err) {
            return res.send(500, err);
        }
        var toClientAccount = acc.securityMapping();
        return res.send(201, toClientAccount);
    });
}

function facebook(req, res) {
    var virtualEmail = req.body.facebookId + '@facebookusers.kulamart.com';
    Account.findOne({email: virtualEmail}, function (err, account) {
        if (err || !account) {
            var virtualReq = {
                email: virtualEmail,
                password: req.body.facebookId + Date.now(),
                facebookId: req.body.facebookId,
                name: req.body.name
            };
            Account.createAccount(virtualReq, function(err, acc){
                if (err) {
                    return res.send(500, err);
                }
                var toClientAccount = acc.securityMapping();
                return res.send(201, toClientAccount);
            });
        } else {
            return res.send(201, account.securityMapping());
        }
    })
}


function addFavoritePost(req, res) {
    console.log(req.account, req.body.postId);
    Account.update({_id: ObjectID(req.account.id)}, {$addToSet: {favoritePosts: req.body.postId}}, function(err, data) {
        console.log(err, data);
        if(err) {
            return res.send(500);
        }
        return res.send(200);
    })
}

function getFavoritePost(req, res) {
    Account.findOne({_id: ObjectID(req.account.id)}, function(err, data) {
        if(err) {
            return res.send(500);
        }
        return res.send(200, {favoritePosts: data.favoritePosts});
    });
}

exports.base = 'account';

exports.routes = [
    {
        'path': 'alive',
        'method': httpMethod.GET,
        'handler': alive,
        'version': '0.0.1'
    },
    {
        'path': 'login',
        'method': httpMethod.POST,
        'handler': login,
        'version': '0.0.1'
    },
    {
        'path': 'signup',
        'method': httpMethod.POST,
        'handler': signup,
        'version': '0.0.1'
    },
    {
        'path': 'facebook',
        'method': httpMethod.POST,
        'handler': facebook
    },
    {
        'path': 'favorite',
        'method': httpMethod.POST,
        'handler': addFavoritePost
    },
    {
        'path': 'favorite',
        'method': httpMethod.GET,
        'handler': getFavoritePost
    }
];