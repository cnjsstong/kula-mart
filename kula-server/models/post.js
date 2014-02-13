var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Status
var Status = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
    DELETED: 'deleted',
    PENDING: 'pending',
    enums: [ this.ACTIVE, this.INACTIVE, this.CLOSED, this.DELETED, this.PENDING ]
}

// Schema
var PostSchema = new Schema({
        title: {
            type: String
        },
        author: {
            type: String
        },
        area: [String],
        category: {
            type: String
        },
        content: {
            type: String
        },
        status: {
            type: String,
            enum: Status.enums,
            'dafault': Status.ACTIVE
        },
        createDate: {
            type: Date,
            'default': Date.now()
        },
        lastModified: {
            type: Date
        },
        replies: [String],
        images: [String]
    },
    {
        id: true
    });

// Static CRUD
PostSchema.statics = {
};

PostSchema.methods = {
};

// Model
Post = mongoose.model('Post', PostSchema, 'Post');

// Exports
exports.Post = Post;
exports.Post.Status = Status;
