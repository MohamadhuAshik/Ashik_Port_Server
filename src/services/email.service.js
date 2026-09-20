const { transporter, verifyTransporter } = require("../config/mailer.config");
const env = require("../config/env.config");
const { generateContactEmailHtml } = require("../templates/contactEmail.template");


async function verifyConnection() {
  return verifyTransporter();
}


async function sendContactEmail({ name, email, subject, message }) {
  const receiver = env.RECEIVER_EMAIL || env.SMTP_USER;
  const finalSubject = subject ? `Portfolio ${subject}` : `Portfolio Message from ${name}`;

  const mailOptions = {
    from: `"${env.SENDER_NAME}" <${env.SMTP_USER}>`,
    to: receiver,
    replyTo: `"${name}" <${email}>`,
    subject: finalSubject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
    html: generateContactEmailHtml({ name, email, subject, message }),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[EmailService] Contact message sent. Message ID: ${info.messageId}`);
  return info;
}


async function sendCustomEmail({ to, subject, text, html, replyTo }) {
  const mailOptions = {
    from: `"${env.SENDER_NAME}" <${env.SMTP_USER}>`,
    to,
    replyTo: replyTo || env.SMTP_USER,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[EmailService] Custom message sent to ${to}. Message ID: ${info.messageId}`);
  return info;
}

module.exports = {
  verifyConnection,
  sendContactEmail,
  sendCustomEmail,
};
