var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    typeList = require('../enums/role').TYPE_LIST,
    validator = require('../lib/validator');

// Schema
var PostSchema = new Schema({
    title: {
        type: String
    },
    content: {
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
PostSchema.statics = {
    authenticate: function (email, token, callback) {
        var query = { 'email': email, 'token': token };
        this.findOne(query, function (err, Post) {
            if (err) {
                callback(err);
            } else {
                if (!Post) {
                    callback('No matched email and token found');
                } else {
                    callback(null, Post);
                }
            }
        });
    },

    createPost: function (Post, callback) {
        if (!Post instanceof Post) {
            callback('Invalid Post');
        } else {
            Post.save(function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }
    },

    findPost: function (query, projection, callback) {
        this.findOne(query, projection, function (err, Post) {
            if (err) {
                callback(err);
            } else {
                if (!Post) {
                    callback('Post not found');
                } else {
                    callback(null, Post);
                }
            }
        });
    },

    findPostList: function (option, callback) {
        this.find(option, function (err, Posts) {
            if (err) {
                callback(err);
            } else {
                if (!Posts) {
                    callback('Posts not found');
                } else {
                    callback(null, Posts);
                }
            }
        });
    },

    updatePost: function (condition, update, callback) {
        this.update(condition, update, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    },

    deletePost: function (option, callback) {
        this.remove(option, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }
};

PostSchema.methods = {
    toClient: function () {
        var Post = this.toObject();
        Post.id = Post._id;
        delete Post._id;
        return Post;
    },

    securityMapping: function () {
        var Post = {};
        Post.id = this.id;
        Post.email = this.email;
        Post.token = this.token;
        return Post;
    }
};

// Model
Post = mongoose.model('Post', PostSchema, 'Post');

// Exports
exports.Post = Post;
exports.Post.Status = Status;

