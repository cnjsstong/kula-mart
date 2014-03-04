var mongoose = require('mongoose'),
    role = require('../enums/role'),
    ObjectID = require('mongodb').ObjectID,
    Schema = mongoose.Schema,
    typeList = require('../enums/role').TYPE_LIST,
    validator = require('../lib/validator'),
    bcrypt = require('bcrypt-nodejs'),
    salt = bcrypt.genSaltSync(),
    tokenGenerator = require('crypto');

var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

// Constants
var Status = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BANNED: 'banned',
    DELETED: 'deleted',
    enums: [this.ACTIVE, this.INACTIVE, this.BANNED, this.DELETED]
};

// Schema
var AccountSchema = new Schema({
        token: {
            type: String
        },
        type: {
            type: Number,
            enum: typeList.TYPE_LIST
        },
        status: {
            type: String,
            enum: Status.enums
        },
        email: {
            type: String,
            index: { unique: true, sparse: true }
        },
        password: {
            type: String
        },
        name: {
            type: String
        },
        facebookId: {
            type: String
        }
    },
    {
        id: true
    });

// Static CRUD
AccountSchema.statics = {
    authenticate: function (email, token, callback) {
        var query = { 'email': email, 'token': token };
        this.findOne(query, function (err, account) {
            if (err) {
                callback(err);
            } else {
                if (!account) {
                    callback('No matched email and token found');
                } else {
                    callback(null, account);
                }
            }
        });
    },

    createAccount: function (accountInfo, callback) {

        var account = new Account();

        account._id = new ObjectID();
        account.email = accountInfo.email;
        account.password = accountInfo.password;
        account.name = accountInfo.name;
        account.facebookId = accountInfo.facebookId;
        account.status = Account.Status.ACTIVE;
        account.type = role.CUSTOMER;

        tokenGenerator.randomBytes(config.tokenLength, function (ex, buf) {
            var token = buf.toString('hex');
            account.password = bcrypt.hashSync(account.password, salt);
            account.token = token;
            Account.save(account, function (err) {
                callback(err, account);
            });
        });
    }
};

AccountSchema.methods = {
//    toClient: function () {
//        var account = this.toObject();
//        account.id = account._id;
//        delete account._id;
//        return account;
//    },

    securityMapping: function () {
        var account = {};
        account.id = this.id;
        account.email = this.email;
        account.token = this.token;
        account.type = this.type;
        return account;
    }
};

// Model
Account = mongoose.model('Account', AccountSchema, 'Account');

// Exports
exports.Account = Account;
exports.Account.Status = Status;

