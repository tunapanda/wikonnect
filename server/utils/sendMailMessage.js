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
  constructor(email, fullName, link, templateName, subject) {
    this.mailOptions = {
      from: emailAuth.defaultFrom,
      to: Buffer.from(email, 'base64').toString('ascii'),
      template: templateName,
      subject: subject,
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

module.exports = async (email, fullName, link, templateName, subject) => {
  const mailType = new GenerateEmail(email, fullName, link, templateName, subject);

  transporter.sendMail(mailType.options, (err) => {
    if (!err) {
      return { message: 'Kindly check your email for further instructions' };
    } else {
      console.log(err);
      return err;
    }
  });
};

