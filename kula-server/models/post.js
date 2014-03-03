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
};

var Type = {
    REQUEST: 'request',
    OFFER: 'offer',
    enums: [ this.REQUEST, this.OFFER ]
};

// Schema
var PostSchema = new Schema({
        title: {
            type: String
        },
        type: {
            type: String,
            enum: Type.enums
        },
        price: {
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
        tags: [String],
        status: {
            type: String,
            enum: Status.enums,
            default: Status.ACTIVE
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        lastModified: {
            type: Date
        },
        replies: [String],
        images: [String],
        duration: {
            type: Number
        },
        expire: {
            type: Date
        },
        neverExpire: {
            type: Boolean,
            default: false
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        delivery: [String]
    },
    {
        id: true
    });

// Static CRUD
PostSchema.statics = {
    getPostByCategoryAndTag: function (category, tag, callback) {
        this.find({
            tags: tag,
            category: category,
            status: Status.ACTIVE,
            $or: [
                { neverExpire: true },
                {
                    $and: [
                        { expire: {
                            $gt: new Date()
                        } },
                        { neverExpire: false }
                    ]
                }
            ]
        }, function (err, posts) {
//            console.log(err, posts);
            callback(err, posts);
        });
    },

    getTagsByCategory: function (category, area, callback) {
        this.aggregate()
            .match({                category: category,
                area: area,
                status: Status.ACTIVE,
                $or: [
                    { neverExpire: true },
                    {
                        $and: [
                            { expire: {
                                $gt: new Date()
                            } },
                            { neverExpire: {
                                $ne: true
                            } }
                        ]
                    }
                ]
            })
            .unwind('tags')
            .group({
                _id: '$tags',
                number: {
                    $sum: 1
                }
            })
            .sort({
                number: -1
            })
            .exec(function (err, res) {
//                console.log(err, res);
                callback(err, res);
            });
    }
};

PostSchema.methods = {
};

// Model
Post = mongoose.model('Post', PostSchema, 'Post');

// Exports
exports.Post = Post;
exports.Post.Status = Status;
exports.Post.Type = Type;

