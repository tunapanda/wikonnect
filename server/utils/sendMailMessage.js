const Mailgun = require('mailgun-js');

const environment = process.env.NODE_ENV || 'development';
let emailAuth;
try {
  emailAuth = require('../config/email')[environment];
} catch (e) {
  emailAuth = require('../config/email.example')[environment];
}

let mg;

if (emailAuth.auth.apiKey) {
  mg = Mailgun({
    apiKey: emailAuth.auth.apiKey,
    domain: emailAuth.auth.domain,
  });
}

const registrationEmailData = (
  encryptedEmail,
  fullName,
  link,
  templateName,
  subject
) => {
  return {
    from: emailAuth.defaultFrom,
    to: Buffer.from(encryptedEmail, 'base64').toString('ascii'),
    subject: subject,
    template: templateName,
    'v:url': link,
    'v:name': fullName,
  };
};

const passwordResetEmailData = (
  encryptedEmail,
  fullName,
  link,
  templateName,
  subject
) => {
  return {
    from: emailAuth.defaultFrom,
    to: Buffer.from(encryptedEmail, 'base64').toString('ascii'),
    subject: subject,
    template: templateName,
    'v:url': link,
    'v:name': fullName,
  };
};

const passwordResetSuccessEmailData = (
  email,
  username,
  templateName,
  subject
) => {
  return {
    from: emailAuth.defaultFrom,
    to: email,
    subject: subject,
    template: templateName,
    'v:name': username,
  };
};

module.exports = {
  mg,
  registrationEmailData,
  passwordResetEmailData,
  passwordResetSuccessEmailData,
};
