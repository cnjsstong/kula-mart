var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema
var AreaSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    address: String,
    coords: {
        latitude: String,
        longitude: String
    }
});

// Static CRUD
AreaSchema.statics = {
};

AreaSchema.methods = {
};

// Model
Area = mongoose.model('Area', AreaSchema, 'Area');

// Exports
exports.Area = Area;

