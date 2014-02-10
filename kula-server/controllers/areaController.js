var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Area = mongoose.model('Area');

/*
 * Create or Update one area.
 */
function createArea(req, res) {
    var area = new Area();
    area._id = new ObjectID();
    area.title = req.body.title;
    area.description = req.body.description;
    area.address = req.body.address;
    area.coords = req.body.coords;

    area.save(function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function updateArea(req, res) {

    var area = {};
    area.title = req.body.title;
    area.description = req.body.description;
    area.address = req.body.address;
    area.coords = req.body.coords;

    Area.update({_id: ObjectID(req.body._id)}, area, {upsert: true}, function (err) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function listAreas(req, res) {
    Area.find({}, function (err, areas) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, areas);
        }
    });
}

function getArea(req, res) {
    Area.findOne({_id: ObjectID(req.params.areaId)}, function (err, area) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, area);
        }
    });
}

function removeArea(req, res) {
    Area.remove({_id: ObjectID(req.params.areaId)}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });

}


exports.base = 'area';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'handler': createArea
    },
    {
        'path': ':areaId',
        'method': httpMethod.POST,
        'handler': updateArea
    },
    {
        'path': '',
        'method': httpMethod.GET,
        'handler': listAreas
    },
    {
        'path': ':areaId',
        'method': httpMethod.GET,
        'handler': getArea
    },
    {
        'path': ':areaId',
        'method': httpMethod.DELETE,
        'handler': removeArea
    }
];