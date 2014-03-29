var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Tag = mongoose.model('Tag');

/*
 * Create or Update one tag.
 */
function createTag(req, res) {
    var tag = new Tag();
    tag._id = new ObjectID();
    tag.title = req.body.title;

    tag.save(function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function updateTag(req, res) {

    var tag = {};
    tag.title = req.body.title;

    Tag.update({_id: ObjectID(req.body._id)}, tag, {upsert: true}, function (err) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function listTags(req, res) {
    Tag.find({}, function (err, tags) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, tags);
        }
    });
}

function getTag(req, res) {
    Tag.findOne({_id: ObjectID(req.params.tagId)}, function (err, tag) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, tag);
        }
    });
}

function removeTag(req, res) {
    Tag.remove({_id: ObjectID(req.params.tagId)}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });

}


exports.base = 'tag';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'roles': [role.ADMIN],
        'handler': createTag
    },
    {
        'path': ':tagId',
        'method': httpMethod.POST,
        'roles': [role.ADMIN],
        'handler': updateTag
    },
    {
        'path': '',
        'method': httpMethod.GET,
        'handler': listTags
    },
    {
        'path': ':tagId',
        'method': httpMethod.GET,
        'handler': getTag
    },
    {
        'path': ':tagId',
        'method': httpMethod.DELETE,
        'roles': [role.ADMIN],
        'handler': removeTag
    }
];