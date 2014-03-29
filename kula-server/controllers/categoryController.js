var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Category = mongoose.model('Category');

/*
 * Create or Update one category.
 */
function createCategory(req, res) {
    var category = new Category();
    category._id = new ObjectID();
    category.title = req.body.title;
    category.template = req.body.template || '';

    category.save(function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function updateCategory(req, res) {

    console.log(req.body);

    var category = {};
    category.title = req.body.title;
    category.template = req.body.template || '';

    Category.update({_id: ObjectID(req.body._id)}, category, {upsert: true}, function (err) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function listCategorys(req, res) {
    Category.find({}, function (err, categorys) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, categorys);
        }
    });
}

function getCategory(req, res) {
    Category.findOne({_id: ObjectID(req.params.categoryId)}, function (err, category) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, category);
        }
    });
}

function removeCategory(req, res) {
    Category.remove({_id: ObjectID(req.params.categoryId)}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });

}


exports.base = 'category';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'roles': [role.ADMIN],
        'handler': createCategory
    },
    {
        'path': ':categoryId',
        'method': httpMethod.POST,
        'roles': [role.ADMIN],
        'handler': updateCategory
    },
    {
        'path': '',
        'method': httpMethod.GET,
        'handler': listCategorys
    },
    {
        'path': ':categoryId',
        'method': httpMethod.GET,
        'handler': getCategory
    },
    {
        'path': ':categoryId',
        'method': httpMethod.DELETE,
        'roles': [role.ADMIN],
        'handler': removeCategory
    }
];