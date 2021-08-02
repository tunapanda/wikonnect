
const environment = process.env.NODE_ENV || 'development';
let emailAuth;
try {
  emailAuth = require('../config/email')[environment];
} catch (e) {
  emailAuth = require('../config/email.example')[environment];
}

let mailgun = require('mailgun-js')({ apiKey: emailAuth.auth.apiKey, domain: emailAuth.auth.domain });

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
      to: email,
      subject: subject,
      template: templateName,
      'v:url': link,
      'v:name': fullName
    };
  }
  // Getter
  get options() {
    return this.mailOptions;
  }
}

module.exports = async (email=Buffer.from(email, 'base64').toString('ascii'), fullName, link, templateName, subject) => {
  const mailType = new GenerateEmail(email, fullName, link, templateName, subject);
  // const mailType = new GenerateEmail('okemwa@tunapanda.org', 'asciifolding', 'python.org', 'email_verification', 'I ma doing great work');
  mailgun.messages().send(mailType.mailOptions, (error, body) => {
    console.log(body);
    console.log(error);
  });
};

