var nodemailer = require('nodemailer');

const send = async (text, subject) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
      
    var mailOptions = {
        from: process.env.SMTP_FROM,
        to:  process.env.SMTP_TO,
        subject: subject,
        text: text
    };
    
    await transporter.sendMail(mailOptions);
}

module.exports.send = async (text, subject) => send(text, subject)