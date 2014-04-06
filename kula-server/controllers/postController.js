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
    post.neverExpire = !!req.body.neverExpire;
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
    Post.findOne({_id: ObjectID(req.params.postId)}, function (err, post) {
        if (err) {
            return res.send(404, "Post not found.");
        }
        if (req.account.type != role.ADMIN && post.author != req.account._id) {
            return res.send(403, "You cannot access someone else's post.");
        }

        var newPost = {};
        newPost.title = req.body.title;
        newPost.type = req.body.type;
        newPost.price = req.body.price;
        newPost.author = req.body.author;
        newPost.area = req.body.area;
        newPost.category = req.body.category;
        newPost.content = req.body.content;
        newPost.tags = req.body.tags;
        newPost.status = Post.Status.ACTIVE;
        newPost.lastModified = Date.now();
        newPost.images = req.body.images;
        newPost.duration = req.body.duration;
        newPost.neverExpire = !!req.body.neverExpire;
        if (!newPost.neverExpire) {
            var expireDate = new Date();
            expireDate.setTime(Date.now() + parseInt(req.body.duration) * 24 * 60 * 60 * 1000);
            newPost.expire = expireDate;
        }
        newPost.email = req.body.email;
        newPost.phone = req.body.phone;
        newPost.delivery = req.body.delivery;

        Post.update({_id: ObjectID(req.body._id)}, newPost, {upsert: true}, function (err) {
            if (err) {
                return res.send(500);
            } else {
                return res.send(200);
            }
        });

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
            },
            {title: 1, content: 1, tags: 1, type: 1}, // Columns to Return
            {
                sort: {
                    _id: -1 //Sort by Date Added DESC
                }
            }, function (err, posts) {
                if (err) {
                    return res.send(500);
                } else {
                    return res.send(200, posts);
                }
            });
    } else {
//        console.log('aaa');
        if (req.params.areaId) {
            Post.find({
                    area: req.params.areaId,
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
                },
                {title: 1, content: 1, tags: 1, type: 1}, // Columns to Return
                {
                    sort: {
                        _id: -1 //Sort by Date Added DESC
                    }
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
    reply.displayName = req.body.displayName;
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
    });
}

function adminQuery(req, res) {
    Post.find({}, function (err, posts) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, posts);
        }
    });
}


function adminDelete(req, res) {
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
        'path': 'admin',
        'method': httpMethod.GET,
        'roles': [role.ADMIN],
        'handler': adminQuery
    },
    {
        'path': 'admin/:postId',
        'method': httpMethod.DELETE,
        'roles': [role.ADMIN],
        'handler': adminDelete
    },
    {
        'path': '',
        'method': httpMethod.POST,
        'roles': [role.ADMIN, role.CUSTOMER],
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
        'roles': [role.ADMIN, role.CUSTOMER],
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
        'roles': [role.ADMIN, role.CUSTOMER],
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
        'roles': [role.ADMIN, role.CUSTOMER],
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
        'roles': [role.ADMIN, role.CUSTOMER],
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