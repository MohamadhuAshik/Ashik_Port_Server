function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateContactEmailHtml({ name, email, subject, message }) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  const initial = (name && name.trim().charAt(0).toUpperCase()) || "U";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);">
          
          <!-- Top Gradient Accent Bar -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #0284c7 0%, #38bdf8 50%, #6366f1 100%); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px 22px 36px;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; background-color: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 9999px; margin-bottom: 12px;">
                      Portfolio Inbound
                    </span>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3; letter-spacing: -0.01em;">
                      New Message Received
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b;">
                      Received via Portfolio Contact Form &middot; ${timestamp} IST
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="height: 1px; background-color: #f1f5f9;"></div>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding: 24px 36px 32px 36px;">

              <!-- Sender Info Card -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" valign="top" style="padding-right: 14px;">
                          <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff; font-weight: 700; font-size: 18px; line-height: 44px; text-align: center; text-transform: uppercase;">
                            ${initial}
                          </div>
                        </td>
                        <td valign="middle">
                          <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
                            ${safeName}
                          </div>
                          <div style="font-size: 13px; color: #0284c7; margin-bottom: ${safeSubject ? "4px" : "0"};">
                            <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none; font-weight: 500;">
                              ${safeEmail}
                            </a>
                          </div>
                          ${safeSubject ? `
                          <div style="font-size: 12px; color: #64748b;">
                            <span style="font-weight: 600; color: #475569;">Subject:</span> ${safeSubject}
                          </div>
                          ` : ""}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Body -->
              <div style="margin-bottom: 28px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">
                  Message Content
                </div>
                <div style="background-color: #ffffff; border-left: 3px solid #0284c7; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 0 10px 10px 0; padding: 18px 20px;">
                  <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #1e293b; white-space: pre-wrap; word-break: break-word;">${safeMessage}</p>
                </div>
              </div>

              <!-- Quick Reply CTA Button -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject || "Your message to Mohamadhu Ashik")}" 
                       style="display: inline-block; background-color: #0284c7; color: #ffffff; font-size: 14px; font-weight: 600; padding: 13px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
                      Reply directly to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 36px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                This message was delivered via your <strong style="color: #334155;">Portfolio Contact Service</strong>.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8;">
                Mohamadhu Ashik S &middot; Full Stack Developer
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

module.exports = {
  generateContactEmailHtml,
};
