var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    typeList = require('../enums/role').TYPE_LIST,
    validator = require('../lib/validator');

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
    createDate: {
        type: Date,
        'default': Date.now()
    },
    lastModified: {
        type: Date
    },
    id: false
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

    createAccount: function (account, callback) {
        if (!account instanceof Account) {
            callback('Invalid account');
        } else {
            account.save(function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }
    }
};

AccountSchema.methods = {
    toClient: function () {
        var account = this.toObject();
        account.id = account._id;
        delete account._id;
        return account;
    },

    securityMapping: function () {
        var account = {};
        account.id = this.id;
        account.email = this.email;
        account.token = this.token;
        return account;
    }
};

// Model
Account = mongoose.model('Account', AccountSchema, 'Account');

// Exports
exports.Account = Account;
exports.Account.Status = Status;

