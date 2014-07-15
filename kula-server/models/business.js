var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema
var BusinessSchema = new Schema({
        title: {
            type: String
        },
        description: {
            type: String
        },
        area: {
            type: String,
            index: true
        },
        admin: [String],
        template: {
            type: String
        },
        story: {
            type: String
        },
        coverPhoto: {
            type: String
        },
        logo: {
            type: String
        },
        photos: [String],
        tags: [String]
    },
    {
        id: true
    });

// Static CRUD
BusinessSchema.statics = {
};

BusinessSchema.methods = {
};

// Model
Business = mongoose.model('Business', BusinessSchema, 'Business');

// Exports
exports.Business = Business;

