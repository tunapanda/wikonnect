const Mailgun = require("mailgun-js");

const environment = process.env.NODE_ENV || "development";
let emailAuth;
try {
  emailAuth = require("../config/email")[environment];
} catch (e) {
  emailAuth = require("../config/email.example")[environment];
}

let mg = Mailgun({
  apiKey: emailAuth.auth.apiKey,
  domain: emailAuth.auth.domain,
});

const registrationEmailData = (
  encryptedEmail,
  fullName,
  link,
  templateName,
  subject
) => {
  return {
    from: emailAuth.defaultFrom,
    to: Buffer.from(encryptedEmail, "base64").toString("ascii"),
    subject: subject,
    template: templateName,
    "v:url": link,
    "v:name": fullName,
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
    to: Buffer.from(encryptedEmail, "base64").toString("ascii"),
    subject: subject,
    template: templateName,
    "v:url": link,
    "v:name": fullName,
  };
};

const passwordResetSuccessEmailData = (email, username, templateName, subject) => {
  return {
    from: emailAuth.defaultFrom,
    to: email,
    subject: subject,
    template: templateName,
    "v:name": username,
  };
};

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
      "v:url": link,
      "v:name": fullName,
    };
  }
  // Getter
  get options() {
    return this.mailOptions;
  }
}

// module.exports = async (encryptedEmail, fullName, link, templateName, subject) => {
//   const email = Buffer.from(encryptedEmail, 'base64').toString('ascii');
//   const mailType = new GenerateEmail(email, fullName, link, templateName, subject);

//   mg.messages().send(mailType.mailOptions, (error, body) => {
//     console.log(body);
//     console.log(error);
//   });
// };

module.exports = {
  mg,
  registrationEmailData,
  passwordResetEmailData,
  passwordResetSuccessEmailData,
};
