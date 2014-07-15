var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Business = mongoose.model('Business');

/*
 * Create or Update one business.
 */
function createBusiness(req, res) {
    var business = new Business();
    business._id = new ObjectID();
    business.title = req.body.title;
    business.description = req.body.description || '';
    business.area = req.body.area;

    business.save(function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function updateBusiness(req, res) {

    console.log(req.body);

    var business = req.body;
    delete business._id;

    Business.findOneAndUpdate({_id: ObjectID(req.params.businessId)}, business, function (err) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function listBusinesss(req, res) {
    var query = {};
    if(req.params.areaId) {
        query.area = {$all: [req.params.areaId]};
    }
    Business.find(query, function (err, businesss) {
        if (err) {
            return res.send(500, err);
        } else {
            return res.send(200, businesss);
        }
    });
}

function getBusiness(req, res) {
    Business.findOne({_id: ObjectID(req.params.businessId)}, function (err, business) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, business);
        }
    });
}

function removeBusiness(req, res) {
    Business.remove({_id: ObjectID(req.params.businessId)}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });

}


exports.base = 'business';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'handler': createBusiness
    },
    {
        'path': ':businessId',
        'method': httpMethod.POST,
        'handler': updateBusiness
    },
    {
        'path': '',
        'method': httpMethod.GET,
        'handler': listBusinesss
    },
    {
        'path': ':businessId',
        'method': httpMethod.GET,
        'handler': getBusiness
    },
    {
        'path': ':businessId',
        'method': httpMethod.DELETE,
        'handler': removeBusiness
    }
];