const config = require("config");
const { sendEmailSendGrid } = require("./sendGridService");
const { sendEmailMailJet } = require("./mailJetService");

require("dotenv").config();

module.exports.sendEmail = async function sendEmail(req, res) {
  let status;
  let response;

  // Get active email provider sorted by priority
  const emailProviders = config
    .get("emailProviders")
    .filter(val => val.active)
    .sort((a, b) => a.priority - b.priority);

  console.log("emailProviders :", emailProviders);

  if (emailProviders.length === 0) {
    status = 400;
    response = { error: "No email provider found" };
  }

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < emailProviders.length; i += 1) {
    const emailProvider = emailProviders[i].provider;

    console.log("Sending Email - Provider:", emailProvider);

    try {
      if (emailProvider === "sendGrid") await sendEmailSendGrid(req.body);
      else if (emailProvider === "mailJet") await sendEmailMailJet(req.body);
      else {
        status = 400;
        response = { error: "No email provider found" };
        break;
      }
      status = 200;
      response = { message: "Email Sent Successfully" };
      break;
    } catch (error) {
      console.log("Error Sending Email - Provider:", emailProvider);
      status = 400;
      let errorMessage = "Error Occured";
      if (error.response) {
        errorMessage = error.response.data;
      }
      response = {
        provider: emailProvider,
        message: errorMessage
      };
    }
  }

  res.status(status);
  res.json(response);
};
