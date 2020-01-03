let emailAuth;

try {
  emailAuth = require('../config/email');
} catch (e) {
  emailAuth = require('../config/email.example');
}

const mailgun = require('mailgun-js')(emailAuth.mailgun.auth);

let from_who = emailAuth.default_from; //Your sending email address


module.exports = async function sendMAil(mail, token) {
  let data = {
    from: from_who,
    to: mail,
    subject: 'Hello from Mailgun',
    html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate' + token + '">Password reset link here</a>'
  };

  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
      console.log('got an error: ', err);
      return err.message;
    }
    //Else we can greet    and leave
    else {
      //Here "submitted.jade" is the view file for this landing page
      //We pass the variable "email" from the url parameter in an object rendered by Jade
      console.log(('submitted', { email: mail }));
      console.log(body);
      return body;
    }
  });
};