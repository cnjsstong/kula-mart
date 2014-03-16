var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID,
    Mail = require('../lib/mail.js');

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Post = mongoose.model('Post');
var Reply = mongoose.model('Reply');
var Category = mongoose.model('Category');

/*
 * Create or Update one post.
 */
function createPost(req, res) {
    var post = new Post();
    post._id = new ObjectID();
    post.title = req.body.title;
    post.type = req.body.type;
    post.price = req.body.price || '';
    post.author = req.account._id;
    post.area = req.body.area;
    post.category = req.body.category;
    post.content = req.body.content || '';
    post.tags = req.body.tags || [];
    post.status = Post.Status.ACTIVE;
    post.replies = [];
    post.images = req.body.images || [];
    post.duration = req.body.duration || 0;
    post.neverExpire = req.body.neverExpire;
    if (!post.neverExpire) {
        var expireDate = new Date();
        expireDate.setTime(Date.now() + parseInt(req.body.duration) * 24 * 60 * 60 * 1000);
        post.expire = expireDate;
    }
    post.email = req.body.email;
    post.phone = req.body.phone || '';
    post.delivery = req.body.delivery || [];

    post.save(function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, post);
        }
    });
}

function updatePost(req, res) {

    var post = {};
    post.title = req.body.title;
    post.type = req.body.type;
    post.price = req.body.price;
    post.author = req.body.author;
    post.area = req.body.area;
    post.category = req.body.category;
    post.content = req.body.content;
    post.tags = req.body.tags;
    post.status = Post.Status.ACTIVE;
    post.lastModified = Date.now();
    post.images = req.body.images;
    post.duration = req.body.duration;
    post.neverExpire = req.body.neverExpire;
    if (!post.neverExpire) {
        var expireDate = new Date();
        expireDate.setTime(Date.now() + parseInt(req.body.duration) * 24 * 60 * 60 * 1000);
        post.expire = expireDate;
    }
    post.email = req.body.email;
    post.phone = req.body.phone;
    post.delivery = req.body.delivery;

    Post.update({_id: ObjectID(req.body._id)}, post, {upsert: true}, function (err) {
        if (err) {
//            console.log(err);
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function listPosts(req, res) {
    console.log(req.params);
    if (req.params.categoryId && req.params.areaId) {
        Post.find({
            category: req.params.categoryId,
            area: {$all: [req.params.areaId]},
            status: Post.Status.ACTIVE,
            $or: [
                { neverExpire: true },
                {
                    $and: [
                        { expire: {
                            $gt: new Date()
                        } },
                        { neverExpire: false }
                    ]
                }
            ]
        }, function (err, posts) {
            if (err) {
                return res.send(500);
            } else {
                return res.send(200, posts);
            }
        });
    } else {
        console.log('aaa');
        if (req.params.areaId) {
            Post.find({
                area: {$all: [req.params.areaId]},
                status: Post.Status.ACTIVE,
                $or: [
                    { neverExpire: true },
                    {
                        $and: [
                            { expire: {
                                $gt: new Date()
                            } },
                            { neverExpire: false }
                        ]
                    }
                ]
            }, function (err, posts) {
                if (err) {
                    return res.send(500);
                } else {
                    return res.send(200, posts);
                }
            })
        } else {
            return res.send(400);
        }
    }
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
    Post.findOne({_id: ObjectID(req.params.postId)}, function (err, post) {
        if (req.account.id == post.author) {
            Post.remove({_id: ObjectID(req.params.postId)}, function (err) {
                if (err) {
                    return res.send(500);
                } else {
                    return res.send(200);
                }
            });
        } else {
            return res.send(403);
        }
    });
}

function getTagsByCategory(req, res) {
    Post.getTagsByCategory(req.params.category, req.params.area, function (err, tags) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, tags);
        }
    });
}

function getPostByCategoryAndTag(req, res) {
    Post.getPostByCategoryAndTag(req.params.category, req.params.tag, function (err, posts) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, posts);
        }
    })
}

function getMyPosts(req, res) {
    Post.find({author: req.account._id}, function (err, posts) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, posts);
        }
    });
}

function replyPost(req, res) {
    console.log(req.params);
    var reply = Reply();
    reply._id = new ObjectID();
    reply.content = req.body.content;
    if (req.account) {
        reply.author = req.account._id;
    }
    reply.name = req.body.name;
    reply.email = req.body.email;
    reply.post = req.params.postId;

    console.log(reply);

    Post.findOne({_id: ObjectID(reply.post)}, function (err, post) {
        if (err) {
            return res.send(500);
        } else {
            reply.save(function (err) {
                if (err) {
                    return res.send(500);
                } else {
                    Mail.sendReplyMail(reply, post);
                    return res.send(200, reply);
                }
            });
        }
    });
}

function getReply(req, res) {
    Reply.findOne({_id: ObjectID(req.params.replyId)}, function (err, reply) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, reply);
        }
    });
}

function respond(req, res) {
    Reply.findOne({_id: ObjectID(req.params.replyId)}, function (err, reply) {
        if (err) {
            return res.send(500);
        } else {
            Mail.sendRespondMail(reply, req.body);
            return res.send(200, reply);
        }
    });
}

function expirePost(req, res) {
    Post.update({_id: ObjectID(req.params.postId)}, {status: Post.Status.CLOSED}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    })
}

exports.base = 'post';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'handler': createPost
    },
    {
        'path': 'tags',
        'method': httpMethod.GET,
        'handler': getTagsByCategory
    },
    {
        'path': 'my',
        'method': httpMethod.GET,
        'handler': getMyPosts
    },
    {
        'path': 'filtered',
        'method': httpMethod.GET,
        'handler': getPostByCategoryAndTag
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
    },
    {
        'path': ':postId/reply',
        'method': httpMethod.POST,
        'handler': replyPost
    },
    {
        'path': ':postId/expire',
        'method': httpMethod.PUT,
        'handler': expirePost
    },
    {
        'path': 'reply/:replyId',
        'method': httpMethod.GET,
        'handler': getReply
    },
    {
        'path': 'reply/:replyId/respond',
        'method': httpMethod.POST,
        'handler': respond
    }
];