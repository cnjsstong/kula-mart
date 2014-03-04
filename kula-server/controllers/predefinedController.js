var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Predefined = mongoose.model('Predefined');

/*
 * Create or Update one predefined.
 */
function createPredefined(req, res) {
    var predefined = new Predefined();
    predefined._id = new ObjectID();
    predefined.title = req.body.title;
    predefined.type = req.body.type || '';

    predefined.save(function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, predefined);
        }
    });
}

function updatePredefined(req, res) {

    console.log(req.body);

    var predefined = {};
    predefined.title = req.body.title;
    predefined.type = req.body.type;

    Predefined.update({_id: ObjectID(req.body._id)}, predefined, {upsert: true}, function (err) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function listPredefineds(req, res) {
    var type = req.params.type;

    Predefined.find({type: type}, function (err, predefineds) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, predefineds);
        }
    });
}

function getPredefined(req, res) {
    Predefined.findOne({_id: ObjectID(req.params.predefinedId)}, function (err, predefined) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, predefined);
        }
    });
}

function removePredefined(req, res) {
    Predefined.remove({_id: ObjectID(req.params.predefinedId)}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });

}


exports.base = 'predefined';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'handler': createPredefined
    },
    {
        'path': ':predefinedId',
        'method': httpMethod.POST,
        'handler': updatePredefined
    },
    {
        'path': '',
        'method': httpMethod.GET,
        'handler': listPredefineds
    },
    {
        'path': ':predefinedId',
        'method': httpMethod.GET,
        'handler': getPredefined
    },
    {
        'path': ':predefinedId',
        'method': httpMethod.DELETE,
        'handler': removePredefined
    }
];