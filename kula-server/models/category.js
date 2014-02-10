var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema
var CategorySchema = new Schema({
        title: {
            type: String,
            index: true
        },
        template: {
            type: String
        }
    },
    {
        id: true
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

