var role = require('../enums/role'),
    httpMethod = require('../enums/http'),
    mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID,
    Mail = require('../lib/mail.js');

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');

var Activity = mongoose.model('Activity');
var Reply = mongoose.model('Reply');
var Category = mongoose.model('Category');

/*
 * Create or Update one event.
 */
function createActivity(req, res) {
    console.log(1, req.body);
    var event = new Activity();
    console.log(2, req.body);
    event._id = new ObjectID();
    console.log(3, req.body);
    event.title = req.body.title;
    event.type = req.body.type || Activity.Type.EVENT;
    event.author = req.account._id;
    event.area = req.body.area;
    console.log(4, req.body);
    event.displayName = req.body.displayName;
    console.log(5, req.body);
    event.content = req.body.content || '';
    event.tags = req.body.tags || [];
    event.status = Activity.Status.ACTIVE;
    event.replies = [];
    event.images = req.body.images || [];
    event.start = req.body.start;
    event.expire = req.body.expire;
    event.email = req.body.email;
    event.phone = req.body.phone || '';
    event.delivery = req.body.delivery || [];

    console.log(event);
    event.save(function (err) {
        console.log(err, event);
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, event);
        }
    });
}

function updateActivity(req, res) {

    var event = {};

    event.title = req.body.title;
    event.type = req.body.type || Activity.Type.EVENT;
    event.author = req.account._id;
    event.area = req.body.area;
    event.displayName = req.body.displayName;
    event.content = req.body.content || '';
    event.tags = req.body.tags || [];
    event.status = Activity.Status.ACTIVE;
    event.replies = [];
    event.images = req.body.images || [];
    event.start = req.body.start;
    event.expire = req.body.expire;
    event.email = req.body.email;
    event.phone = req.body.phone || '';
    event.delivery = req.body.delivery || [];

    event.lastModified = Date.now();


    Activity.update({_id: ObjectID(req.body._id)}, event, {upsert: true}, function (err) {
        if (err) {
            return res.send(500, err);
        } else {
            return res.send(200);
        }
    });
}

function listActivitys(req, res) {
    console.log(req.params);
    if (req.params.areaId) {
        Activity.find({
            area: {$all: [req.params.areaId]},
            status: Activity.Status.ACTIVE,
            expire: {
                $gt: new Date()
            }
        }, function (err, events) {
            if (err) {
                return res.send(500);
            } else {
                return res.send(200, events);
            }
        });
    } else {
        return res.send(400);
    }
}


function adminListActivitys(req, res) {
    console.log(req.params);
    Activity.find({}, function (err, events) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, events);
        }
    });
}

function getActivity(req, res) {
    Activity.findOne({_id: ObjectID(req.params.eventId)}, function (err, event) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200, event);
        }
    });
}

function removeActivity(req, res) {
    Activity.remove({_id: ObjectID(req.params.eventId)}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    });
}

function replyActivity(req, res) {
    console.log(req.params);
    var reply = Reply();
    reply._id = new ObjectID();
    reply.content = req.body.content;
    if (req.account) {
        reply.author = req.account._id;
    }
    reply.displayName = req.body.displayName;
    reply.email = req.body.email;
    reply.event = req.params.eventId;

    console.log(reply);

    Activity.findOne({_id: ObjectID(reply.event)}, function (err, event) {
        if (err) {
            return res.send(500);
        } else {
            Mail.sendReplyMail(reply, event);
            return res.send(200, reply);
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

function expireActivity(req, res) {
    Activity.update({_id: ObjectID(req.params.eventId)}, {status: Activity.Status.CLOSED}, function (err) {
        if (err) {
            return res.send(500);
        } else {
            return res.send(200);
        }
    })
}

exports.base = 'event';

exports.routes = [
    {
        'path': '',
        'method': httpMethod.POST,
        'handler': createActivity
    },
    {
        'path': ':eventId',
        'method': httpMethod.POST,
        'handler': updateActivity
    },
    {
        'path': '',
        'method': httpMethod.GET,
        'handler': listActivitys
    },
    {
        'path': 'admin',
        'method': httpMethod.GET,
        'roles': [role.ADMIN],
        'handler': adminListActivitys
    },
    {
        'path': ':eventId',
        'method': httpMethod.GET,
        'handler': getActivity
    },
    {
        'path': ':eventId',
        'method': httpMethod.DELETE,
        'handler': removeActivity
    },
    {
        'path': ':eventId/reply',
        'method': httpMethod.POST,
        'handler': replyActivity
    },
    {
        'path': ':eventId/expire',
        'method': httpMethod.PUT,
        'handler': expireActivity
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