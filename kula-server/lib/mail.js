
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "kulamart.noreply@gmail.com",
        pass: "semicond"
    }
});



exports.sendMail = function (email, token) {
    var mailOptions = {
        from: "KulaMart <noreply@kulamart.com>", // sender address
        to: email, // list of receivers
        subject: "FotoDish Activation", // Subject line
        text: "http://127.0.0.1:9000/#/activate?token="+token+"&email="+email // plaintext body
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        }
        else {
            console.log("Message sent: " + response.message);
        }
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
};

exports.sendReplyMail = function (reply, post) {
    console.log('sending', reply, post);
    var mailOptions = {
        from: "KulaMart <noreply@kulamart.com>", // sender address
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
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
};

exports.sendRespondMail = function (reply, respond) {
    console.log('sending', reply, respond);
    var mailOptions = {
        from: "KulaMart <noreply@kulamart.com>", // sender address
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
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
};
