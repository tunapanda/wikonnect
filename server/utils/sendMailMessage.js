const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const environment = process.env.NODE_ENV || 'development';


let emailAuth;
try {
  emailAuth = require('../config/email')[environment];
} catch (e) {
  emailAuth = require('../config/email.example')[environment];
}

let transporter = nodemailer.createTransport({
  host: emailAuth.provider,
  port: 2525,
  auth: emailAuth.auth
});

transporter.use('compile', hbs({
  // viewEngine: 'handlebars',
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./email/templates/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./email/templates/'),
  extName: '.html'
}));

/**
 *
 * @param {*} email
 * @param {*} fullName
 * @param {*} link
 * @param {*} templateName ...email template name
 * @returns mailOptions
 */

class GenerateEmail {
  constructor(email, fullName, link, templateName) {
    this.mailOptions = {
      from: emailAuth.defaultFrom,
      to: Buffer.from(email, 'base64').toString('ascii'),
      template: templateName,
      subject: 'Password help has arrived!',
      context: {
        url: link,
        name: fullName
      }
    };
  }
  // Getter
  get options() {
    return this.mailOptions;
  }
}

module.exports = async (email, fullName, token, templateName) => {
  const link = `http://localhost:3000/api/v1/auth/verify?email=${email}&token=${token}`;
  const mailType = new GenerateEmail(email, fullName, link, templateName);

  transporter.sendMail(mailType.options, (err) => {
    if (!err) {
      return { message: 'Kindly check your email for further instructions' };
    } else {
      console.log(err);
      return err;
    }
  });
};

