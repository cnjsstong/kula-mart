var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

var fs = require("fs");

var Post = mongoose.model('Post');
var Category = mongoose.model('Category');

var _ = require('lodash-node');
//console.log(_);
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;


function getPost(req, res) {
    Post.findOne({_id: ObjectID(req.params.postId)}, function (err, post) {
        if (err) {
            return res.send(500);
        } else {
            fs.readFile('templates/post.html', function(err, data) {
                if(err) {
                    return res.send(500);
                }

                var compiled = _.template(data.toString(), post, {variable: 'post'});
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(compiled),
                    'Content-Type': 'text/html'
                });
                res.write(compiled);
                return res.end();
            });
        }
    });
}


exports.base = 'crawl';

exports.routes = [
    {
        'path': 'post/:postId',
        'method': httpMethod.GET,
        'handler': getPost
    }
];