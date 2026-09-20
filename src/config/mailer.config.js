const nodemailer = require("nodemailer");
const env = require("./env.config");


function createTransporter() {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Prevents failure with self-signed development certificates
    },
  });
}

const transporter = createTransporter();


async function verifyTransporter() {
  return transporter.verify();
}

module.exports = {
  transporter,
  verifyTransporter,
};
