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
    EVENT: 'event',
    SALES: 'sales',
    enums: [ this.EVENT, this.SALES ]
};

// Schema
var ActivitySchema = new Schema({
        title: {
            type: String
        },
        type: {
            type: String,
            enum: Type.enums,
            default: Type.EVENT
        },
//        price: {
//            type: String
//        },
        author: {
            type: String
        },
        area: [String],
//        category: {
//            type: String
//        },
        name: {
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
//        duration: {
//            type: Number
//        },
        start: {
            type: Date
        },
        expire: {
            type: Date
        },
//        neverExpire: {
//            type: Boolean,
//            default: false
//        },
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
ActivitySchema.statics = {
    getActivityByCategoryAndTag: function (category, tag, callback) {
        var query = {
            tags: tag,
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
        };
        if (category) {
            query.category = category;
        }
        this.find(query, function (err, events) {
//            console.log(err, events);
            callback(err, events);
        });
    },

    getTagsByCategory: function (category, area, callback) {
        var query = {
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
        };
        if (category) {
            query.category = category;
        }
        this.aggregate()
            .match(query)
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

ActivitySchema.methods = {
};

// Model
Activity = mongoose.model('Activity', ActivitySchema, 'Activity');

// Exports
exports.Activity = Activity;
exports.Activity.Status = Status;
exports.Activity.Type = Type;

