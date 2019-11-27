const axios = require("axios");
const config = require("config");
require("dotenv").config();

function createRequestSendGrid(emailData) {
  const personalizations = emailData.recipients.map(data => {
    const email = {};
    email.to = data.to;
    if (data.cc) email.cc = data.cc;
    if (data.bcc) email.bcc = data.bcc;
    return email;
  });

  return {
    personalizations,
    from: emailData.from,
    subject: emailData.subject,
    content: [
      {
        type: emailData.content.type,
        value: emailData.content.value
      }
    ]
  };
}

module.exports.sendEmailSendGrid = function sendEmailSendGrid(emailData) {
  const sendGridRequest = createRequestSendGrid(emailData);
  console.log("SendGrid-Request :", JSON.stringify(sendGridRequest));

  const options = {
    headers: { Authorization: `Bearer ${process.env.SENDGRID_TOKEN}` }
  };

  return axios
    .post(config.get("url.sendGrid"), sendGridRequest, options)
    .then(response => {
      console.log(`SendGrid-Response:${JSON.stringify(response.data)}`);
      console.log(`SendGrid-Status:${JSON.stringify(response.status)}`);
    })
    .catch(error => {
      if (error.response) {
        console.log(`SendGrid-Error:${JSON.stringify(error.response.data)}`);
        console.log(`SendGrid-Status:${error.response.status}`);
      }
      Promise.reject(error);
    });
};
