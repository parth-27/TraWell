const nodemailer = require('nodemailer');

const emailservice = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure:false,
    auth: {
        user: 'rosa97@ethereal.email',
        pass: '2dx2JPStaPKUnXgses'
    }
});

module.exports=emailservice;