/**
 * Quick CLI test script to verify your SMTP connection and send a test message.
 * Usage:
 *   npm run test:email
 */
const env = require("./src/config/env.config");
const { transporter, verifyTransporter } = require("./src/config/mailer.config");
const { generateContactEmailHtml } = require("./src/templates/contactEmail.template");

async function main() {
  console.log("🔍 Checking SMTP Configuration...");
  console.log(`Host:   ${env.SMTP_HOST}`);
  console.log(`Port:   ${env.SMTP_PORT} (secure: ${env.SMTP_SECURE})`);
  console.log(`User:   ${env.SMTP_USER || "(not configured)"}`);
  console.log(`Target: ${env.RECEIVER_EMAIL}`);

  if (!env.SMTP_USER || !env.SMTP_PASS || env.SMTP_PASS === "your_app_password_here") {
    console.error("\n❌ Error: SMTP_USER and SMTP_PASS must be configured in .env before running this test.");
    console.log("👉 Tip: For Gmail, generate a 16-character App Password at https://myaccount.google.com/apppasswords");
    process.exit(1);
  }

  try {
    console.log("\n⏳ Verifying connection to SMTP server...");
    await verifyTransporter();
    console.log("✅ SMTP Server connection verified successfully!");

    console.log("\n✉️  Sending test email...");
    const recipient = env.RECEIVER_EMAIL || env.SMTP_USER;

    const info = await transporter.sendMail({
      from: `"${env.SENDER_NAME}" <${env.SMTP_USER}>`,
      to: recipient,
      subject: "[Test] Node.js SMTP Server Test Verification",
      text: "Congratulations! Your modular Node.js SMTP server is properly configured and sending emails successfully.",
      html: generateContactEmailHtml({
        name: "Test Runner",
        email: env.SMTP_USER,
        subject: "SMTP Server Verification",
        message: "Congratulations! Your modular Node.js SMTP server is properly configured and sending emails successfully.",
      }),
    });

    console.log(`🎉 Test email sent successfully! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error("\n❌ Failed to send email via SMTP:");
    console.error(err.message);
  }
}

main();
