
function formatEmailMessage({ name, email, subject, message } = {}) {
  return {
    name: name?.trim() || "",
    email: email?.trim() || "",
    subject: subject?.trim() || "New Contact Message",
    message: message?.trim() || "",
    createdAt: new Date(),
  };
}


function validateEmailMessage(emailData = {}) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const name = emailData?.name?.trim() || "";
  const email = emailData?.email?.trim() || "";
  const message = emailData?.message?.trim() || "";

  if (!name) {
    errors.push("Name is required.");
  } else if (name.length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }

  if (!email) {
    errors.push("Email address is required.");
  } else if (!emailRegex.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  if (!message) {
    errors.push("Message content is required.");
  } else if (message.length < 5) {
    errors.push("Message must be at least 5 characters long.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  formatEmailMessage,
  validateEmailMessage,
};
