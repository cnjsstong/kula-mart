
var nodemailer = require("nodemailer");

// Load configurations (default: development)
var env = process.env.NODE_ENV || 'development',
    config = require('../conf/' + env + '.local.config');


// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: config.email_options.account,
        pass: config.email_options.password
    }
});

exports.sendReplyMail = function (reply, post) {
    console.log('sending', reply, post);
    var mailOptions = {
        from: config.email_options.sender, // sender address
        to: post.email, // list of receivers
        subject: "[KulaMart]You have a new reply for your post [" + post.title + "]", // Subject line
        text: "Your Post:\n"+post.content+"\n\nReply:\n"+reply.content + "\n\nClick the link below to view and respond to this reply:\nhttp://kula.sj.gs/reply/"+reply._id // plaintext body
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        }
        else {
            console.log("Message sent: " + response.message);
        }
    });
};

exports.sendRespondMail = function (reply, respond) {
    console.log('sending', reply, respond);
    var mailOptions = {
        from: config.email_options.sender, // sender address
        to: reply.email, // list of receivers
        subject: "[KulaMart]The poster responded to your reply", // Subject line
        text: "Your reply:\n"+reply.content + "\n\nRespond:\n"+respond.content // plaintext body
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        }
        else {
            console.log("Message sent: " + response.message);
        }
    });
};
