var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema
var TagSchema = new Schema({
        title: {
            type: String,
            index: true
        }
    },
    {
        id: true
    });

// Static CRUD
TagSchema.statics = {
};

TagSchema.methods = {
};

// Model
Tag = mongoose.model('Tag', TagSchema, 'Tag');

// Exports
exports.Tag = Tag;

