const { sendContactEmail, sendCustomEmail } = require("../services/email.service");


async function sendContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.emailData;

    const result = await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      messageId: result.messageId,
    });

  } catch (error) {
    console.error("[EmailController] Failed to send email:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to dispatch email via SMTP server.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}


async function sendCustom(req, res, next) {
  try {
    const { to, subject, text, html, replyTo } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        error: "Recipient 'to', 'subject', and email content ('text' or 'html') are required.",
      });
    }

    const result = await sendCustomEmail({
      to,
      subject,
      text,
      html,
      replyTo,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully!",
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("[EmailController] Failed custom email:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to dispatch email.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

module.exports = {
  sendContact,
  sendCustom,
};
