const axios = require("axios");
const config = require("config");
require("dotenv").config();

function createRequestMailJet(emailData) {
  const messages = emailData.recipients.map(data => {
    const email = {};
    email.Subject = emailData.subject;
    email.TextPart = emailData.content.value;
    email.From = emailData.from;
    email.To = data.to;
    email.To = data.to;
    if (data.cc) email.Cc = data.cc;
    if (data.bcc) email.Bcc = data.bcc;
    return email;
  });

  return {
    Messages: messages
  };
}

module.exports.sendEmailMailJet = function sendEmailMailJet(emailData) {
  const mailJetRequest = createRequestMailJet(emailData);
  console.log("MailJet-Request:", JSON.stringify(mailJetRequest));

  const options = {
    auth: {
      username: process.env.MAILJET_USER,
      password: process.env.MAILJET_PASSWORD
    }
  };

  return axios
    .post(config.get("url.mailJet"), mailJetRequest, options)
    .then(response => {
      console.log(`MailJet-Response:${JSON.stringify(response.data)}`);
      console.log(`MailJet-Status:${JSON.stringify(response.status)}`);
    })
    .catch(error => {
      if (error.response) {
        console.log(`MailJet-Error:${JSON.stringify(error.response.data)}`);
        console.log(`MailJet-Status:${error.response.status}`);
      }
      Promise.reject(error);
    });
};
