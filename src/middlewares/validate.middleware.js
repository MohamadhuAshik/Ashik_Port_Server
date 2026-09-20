const { formatEmailMessage, validateEmailMessage } = require("../models/email.model");


function validateContactPayload(req, res, next) {
  const emailData = formatEmailMessage(req.body);
  const { isValid, errors } = validateEmailMessage(emailData);

  if (!isValid) {
    return res.status(422).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  // Attach sanitized email data to request for the controller
  req.emailData = emailData;
  next();
}

module.exports = {
  validateContactPayload,
};
