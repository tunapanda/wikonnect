module.exports = {
  development: {
    provider: process.env.SMTP_HOSTNAME,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
    defaultFrom: process.env.FROM_EMAIL_ADDRESS,
  },
  production: {
    provider: process.env.SMTP_HOSTNAME,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
    defaultFrom: process.env.FROM_EMAIL_ADDRESS,

  }
};
