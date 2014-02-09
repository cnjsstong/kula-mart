var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema
var ReplySchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    post: {
        type: String,
        index: true
    },
    createDate: {
        type: Date,
        'default': Date.now()
    },
    anonymous: {
        type: Boolean
    }
});

// Static CRUD
ReplySchema.statics = {
};

ReplySchema.methods = {
};

// Model
Reply = mongoose.model('Reply', ReplySchema, 'Reply');

// Exports
exports.Reply = Reply;

