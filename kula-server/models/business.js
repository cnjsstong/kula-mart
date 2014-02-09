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
    }
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

