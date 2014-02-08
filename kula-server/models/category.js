var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema
var CategorySchema = new Schema({
    title: {
        type: String
    },
    parent: {
        type: String
    },
    template: {
        type: String
    },
    id: false
});

// Static CRUD
CategorySchema.statics = {
};

CategorySchema.methods = {
};

// Model
Category = mongoose.model('Category', CategorySchema, 'Category');

// Exports
exports.Category = Category;

