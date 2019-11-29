const express = require("express");

const router = express.Router();
const emailController = require("./emailController");
const { emailSendValidationRules, validate } = require("./emailValidator");

router.post(
  "/send",
  emailSendValidationRules(),
  validate,
  emailController.sendEmail
);

module.exports = router;
