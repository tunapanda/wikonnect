module.exports = {
  test: {
    provider: process.env.SMTP_HOSTNAME,
    auth: {
      apiKey: process.env.MAILGUN_API_KEY,
      domail: process.env.MAILGUN_DOMAIN,
    },
    defaultFrom: process.env.FROM_EMAIL_ADDRESS,
  },
  ci: {
    provider: process.env.SMTP_HOSTNAME,
    auth: {
      apiKey: process.env.MAILGUN_API_KEY,
      domail: process.env.MAILGUN_DOMAIN,
    },
    defaultFrom: process.env.FROM_EMAIL_ADDRESS,
  },
  action: {
    provider: process.env.SMTP_HOSTNAME,
    auth: {
      apiKey: process.env.MAILGUN_API_KEY,
      domail: process.env.MAILGUN_DOMAIN,
    },
    defaultFrom: process.env.FROM_EMAIL_ADDRESS,
  },
  development: {
    provider: "mtp.mailtrap.io",
    auth: {
      user: "Habibajuma",
      pass: "Jayanjay",
    },
    defaultFrom: process.env.FROM_EMAIL_ADDRESS,
  },
  //   provider: process.env.SMTP_HOSTNAME,
  //   auth: {
  //     apiKey: process.env.MAILGUN_API_KEY,
  //     domail: process.env.MAILGUN_DOMAIN,
  //   },
  //   defaultFrom: process.env.FROM_EMAIL_ADDRESS,
  // },
  production: {
    provider: process.env.SMTP_HOSTNAME,
    auth: {
      apiKey: process.env.MAILGUN_API_KEY,
      domail: process.env.MAILGUN_DOMAIN,
    },
    defaultFrom: process.env.FROM_EMAIL_ADDRESS,
  },
};

