
var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Category = mongoose.model('Category');

/*
 * Create or Update one category.
 */
function createOrUpdateCategory(req, res){
    var category = new Category();
    if(req.body.id) {
        category._id = req.body.id;
    } else {
        category._id = new ObjectID();
    }

    category.title = req.body.title;
    category.parent = req.body.parent;
    category.template = req.body.template;

    category.save();
    return res.send(200);
}

function listCategorys(req, res) {
    Category.find({}, function(err, categorys) {
        if(err) {
            return res.send(500);
        } else {
            return res.send(200, categorys);
        }
    });
}

function getCategory(req, res) {
    Category.findOne({_id: ObjectID(req.params.categoryId)}, function(err, category) {
        if(err) {
            return res.send(500);
        } else {
            return res.send(200, category);
        }
    });
}


exports.base = 'category';

exports.routes = [
    {
        'path' : '',
        'method' : httpMethod.POST,
        'handler' : createOrUpdateCategory
    },
    {
        'path' : '',
        'method' : httpMethod.GET,
        'handler' : listCategorys
    },
    {
        'path': ':categoryId',
        'method': httpMethod.GET,
        'handler': getCategory
    }
];