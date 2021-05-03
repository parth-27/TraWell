const nodemailer = require('nodemailer');

let nodemailerTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.APPLICATION_PASSWORD)
    }
});


exports.sendEmail = function (email, secretCode ,callback) {
    let options = {
        from: String('Account Confirmation OTP ' + process.env.EMAIL),
        to: email,
        subject: "Your TraWell Verification OTP",
        text: `Please Enter this ${secretCode} on TraWell Site`
    };
    nodemailerTransporter.sendMail(options, (error, info) => {
        if (error) {
            return callback(error);
        }
        callback(error, info);
    });
};