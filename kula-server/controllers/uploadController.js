var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');


var fs = require('fs');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('conf/aws_config.json');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var bucket = 'img.kulamart.com';

//var Predefined = mongoose.model('Predefined');

/*
 * Create or Update one predefined.
 */
//function createPredefined(req, res) {
//    var predefined = new Predefined();
//    predefined._id = new ObjectID();
//    predefined.title = req.body.title;
//    predefined.type = req.body.type || '';
//
//    predefined.save(function (err) {
//        if (err) {
//            return res.send(500);
//        } else {
//            return res.send(200, predefined);
//        }
//    });
//}
//
//function updatePredefined(req, res) {
//
//    console.log(req.body);
//
//    var predefined = {};
//    predefined.title = req.body.title;
//    predefined.type = req.body.type;
//
//    Predefined.update({_id: ObjectID(req.body._id)}, predefined, {upsert: true}, function (err) {
//        if (err) {
//            console.log(err);
//            return res.send(500);
//        } else {
//            return res.send(200);
//        }
//    });
//}
//
//function listPredefineds(req, res) {
//    var type = req.params.type;
//
//    Predefined.find({type: type}, function (err, predefineds) {
//        if (err) {
//            return res.send(500);
//        } else {
//            return res.send(200, predefineds);
//        }
//    });
//}
//
//function getPredefined(req, res) {
//    Predefined.findOne({_id: ObjectID(req.params.predefinedId)}, function (err, predefined) {
//        if (err) {
//            return res.send(500);
//        } else {
//            return res.send(200, predefined);
//        }
//    });
//}
//
//function removePredefined(req, res) {
//    Predefined.remove({_id: ObjectID(req.params.predefinedId)}, function (err) {
//        if (err) {
//            return res.send(500);
//        } else {
//            return res.send(200);
//        }
//    });
//
//}

function upload(req, res) {
    var image = req.files.image;
    var imageId = new ObjectID();
    fs.readFile(image.path, function(err, data) {
        if(err) {
            return res.send(500, err);
        }
        var params = {Key: imageId.toString(), Bucket: bucket, Body: new Buffer(data,'binary'), ACL: 'public-read'};
        s3.putObject(params, function(err, result) {
            if(err) {
                return res.send(500,err);
            }
            return res.send(201, {imageId: imageId});
        })
    })
}

exports.base = 'upload';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'handler': upload
    }//,
//    {
//    'path': ':predefinedId',
//    'method': httpMethod.POST,
//    'handler': updatePredefined
//},
//{
//    'path': '',
//    'method': httpMethod.GET,
//    'handler': listPredefineds
//},
//{
//    'path': ':predefinedId',
//    'method': httpMethod.GET,
//    'handler': getPredefined
//},
//{
//    'path': ':predefinedId',
//    'method': httpMethod.DELETE,
//    'handler': removePredefined
//}
];