var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID;

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Post = mongoose.model('Post');

/*
 * Create or Update one post.
 */
function createPost(req, res) {
    var post = new Post();
    post._id = new ObjectID();
    post.title = req.body.title;
    post.author = req.body.author;
    post.area = req.body.area;
    post.content = req.body.content;
    post.category = req.body.category;
    post.replies = [];
    post.images = req.body.images;

    post.save(function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function updatePost(req, res) {

    var post = {};
    post.title = req.body.title;
    post.author = req.body.author;
    post.area = req.body.area;
    post.content = req.body.content;
    post.category = req.body.category;
    post.lastModified = Date.now();
    post.images = req.body.images;

    Post.update({_id: ObjectID(req.body._id)}, post, {upsert: true}, function (err) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function listPosts(req, res) {
    Post.find({}, function (err, posts) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, posts);
        }
    });
}

function getPost(req, res) {
    Post.findOne({_id: ObjectID(req.params.postId)}, function (err, post) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, post);
        }
    });
}

function removePost(req, res) {
    Post.remove({_id: ObjectID(req.params.postId)}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });

}


exports.base = 'post';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'handler': createPost
    },
    {
        'path': ':postId',
        'method': httpMethod.POST,
        'handler': updatePost
    },
    {
        'path': '',
        'method': httpMethod.GET,
        'handler': listPosts
    },
    {
        'path': ':postId',
        'method': httpMethod.GET,
        'handler': getPost
    },
    {
        'path': ':postId',
        'method': httpMethod.DELETE,
        'handler': removePost
    }
];