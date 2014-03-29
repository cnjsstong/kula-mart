
var nodemailer = require("nodemailer");
var fs = require("fs");

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

    fs.readFile('templates/reply.html', function(err, data) {
        console.log(err, data.toString());
        if(!err) {
            var mailOptions = {
                from: config.email_options.sender, // sender address
                to: post.email, // list of receivers
                replyTo: reply.email,
                subject: "You have a reply of your listing from Kulamart.com", // Subject line
                html: data.toString()
                    .replace('{{ post.title }}', post.title)
                    .replace('{{ reply.author.name }}', reply.name || 'Anonymous')
                    .replace('{{ reply.content }}', reply.content)
                    .replace('{{ reply._id }}', reply._id)
                    .replace('{{ post.images[0] }}', post.images[0] || 'placeholder.png')
                    .replace('{{ reply.email }}', reply.email)
                    .replace('{{ reply.email }}', reply.email),
                generateTextFromHTML: true
            };

            console.log(mailOptions);

            smtpTransport.sendMail(mailOptions, function(error, response){
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Message sent: " + response.message);
                }
            });
        } else {
            console.log(err);
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
