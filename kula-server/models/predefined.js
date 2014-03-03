var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Type = {
    DELIVERY: 'delivery',
    TAG: 'tag',
    enums: [ this.DELIVERY, this.TAG ]
};

// Schema
var PredefinedSchema = new Schema({
        title: {
            type: String
        },
        type: {
            type: String,
            index: true
        }
    },
    {
        id: true
    });

// Static CRUD
PredefinedSchema.statics = {
};

PredefinedSchema.methods = {
};

// Model
Predefined = mongoose.model('Predefined', PredefinedSchema, 'Predefined');

// Exports
exports.Predefined = Predefined;

