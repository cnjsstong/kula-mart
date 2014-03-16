var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema
var ReplySchema = new Schema({
        content: {
            type: String
        },
        author: {
            type: String,
            index: true
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        post: {
            type: String,
            index: true
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        anonymous: {
            type: Boolean,
            default: false
        }
    },
    {
        id: true
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

