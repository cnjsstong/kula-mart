var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

var fs = require("fs");

var Post = mongoose.model('Post');
var Category = mongoose.model('Category');

var _ = require('lodash-node');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function getPost(req, res) {

    function filterPrice(price) {
        if (!price || price == 0) {
            return 'Free';
        } else {
            return '$' + price;
        }
    }

    Post.findOne({_id: ObjectID(req.params.postId)}, function (err, post) {
        if (err) {
            return res.send(500);
        } else {
            fs.readFile('templates/post.html', function (err, data) {
                if (err) {
                    return res.send(500);
                }
                var vars = {
                    title: (post.type == 'request' ? '[Requesting] ' : '[Offering] ') + post.title + ' - for ' + filterPrice(post.price),
                    link: 'http://kulamart.com/post/' + post._id,
                    image: 'http://img.kulamart.com.s3.amazonaws.com/' + post.images[0] || 'category/' + post.category,
                    description: post.content
                };
                var compiled = _.template(data.toString(), vars, {variable: 'vars'});
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