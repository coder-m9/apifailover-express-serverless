const express = require("express");

const router = express.Router();
const emailController = require("../controller/v1/emailController");
const {
  emailSendValidationRules,
  validate
} = require("../validator/v1/emailValidator");

router.post(
  "/send",
  emailSendValidationRules(),
  validate,
  emailController.sendEmail
);

module.exports = router;
