const { body, validationResult } = require("express-validator");

const emailSendValidationRules = () => {
  return [
    body("recipients.*").custom(data => {
      const allEmails = [];

      function addEmail(arr) {
        arr.forEach(val => {
          allEmails.push(val.email);
        });
      }

      if (data.to !== undefined && Array.isArray(data.to)) {
        addEmail(data.to);
      }
      if (data.cc !== undefined && Array.isArray(data.cc)) {
        addEmail(data.cc);
      }
      if (data.bcc !== undefined && Array.isArray(data.bcc)) {
        addEmail(data.bcc);
      }

      if (new Set(allEmails).size !== allEmails.length) {
        return Promise.reject("No duplicate emails in To,Cc,Bcc");
      }
      return Promise.resolve();
    }),

    body("recipients.*.to").custom(value => {
      if (!Array.isArray(value) || value.length < 1) {
        return Promise.reject("Atlest one email should be given in To");
      }
      return Promise.resolve();
    }),
    body("recipients.*.to.*.email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ max: 100 })
      .withMessage("Invalid length for email"),

    body("recipients.*.to.*.name")
      .isLength({ min: 2, max: 50 })
      .withMessage("Invalid length for name"),

    body("recipients.*.cc").custom(value => {
      if (value !== undefined) {
        if (!Array.isArray(value)) {
          return Promise.reject("Invalid Value for Cc");
        }
      }
      return Promise.resolve();
    }),
    body("recipients.*.cc.*.email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ max: 100 })
      .withMessage("Invalid length for email"),

    body("recipients.*.cc.*.name")
      .isLength({ min: 2, max: 50 })
      .withMessage("Invalid length for name"),

    body("recipients.*.bcc").custom(value => {
      if (value !== undefined) {
        if (!Array.isArray(value)) {
          return Promise.reject("Invalid Value for Bcc");
        }
      }
      return Promise.resolve();
    }),
    body("recipients.*.bcc.*.email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ max: 100 })
      .withMessage("Invalid length for email"),

    body("recipients.*.bcc.*.name")
      .isLength({ min: 2, max: 50 })
      .withMessage("Invalid length for name"),

    body("from.email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ max: 100 })
      .withMessage("Invalid length for email"),

    body("from.name")
      .isLength({ min: 2, max: 50 })
      .withMessage("Invalid length for name"),

    body("subject")
      .isLength({ min: 2 })
      .withMessage("Subject should be minimum length 2"),

    body("content.value")
      .isLength({ min: 20 })
      .withMessage("Subject should be minimum length 20")
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors
  });
};

module.exports = {
  emailSendValidationRules,
  validate
};
