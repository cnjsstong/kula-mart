
var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Post = mongoose.model('Post');

/*
 * Create or Update one post.
 */
function createOrUpdatePost(req, res){
    var post = new Post();
    if(req.body.id) {
        post._id = req.body.id;
    } else {
        post._id = new ObjectID();
    }

    post.title = req.body.title;
    post.author = req.body.author;
    post.area = req.body.area;
    post.category = req.body.category;
    post.content = req.body.content;

    post.save();
    return res.send(200);
}

function listPosts(req, res) {
    Post.find({}, function(err, posts) {
        if(err) {
            return res.send(500);
        } else {
            return res.send(200, posts);
        }
    });
}

function getPost(req, res) {
    Category.findOne({_id: ObjectID(req.params.postId)}, function(err, post) {
        if(err) {
            return res.send(500);
        } else {
            return res.send(200, post);
        }
    });
}


exports.base = 'post';

exports.routes = [
    {
        'path' : '',
        'method' : httpMethod.POST,
        'handler' : createOrUpdatePost
    },
    {
        'path' : '',
        'method' : httpMethod.GET,
        'handler' : listPosts
    },
    {
        'path': ':postId',
        'method': httpMethod.GET,
        'handler': getPost
    }
];