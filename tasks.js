
const fs = require("fs/promises");
const path = require("path");
const nodemailer = require("nodemailer");

const recordsPath = path.join(__dirname, "data", "records.json");

// TASK 1: Delete records older than 30 days
async function deleteStaleRecords() {
  console.log("Starting stale records cleanup...");

  const fileContent = await fs.readFile(recordsPath, "utf8");
  const records = JSON.parse(fileContent);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const activeRecords = records.filter((record) => {
    return new Date(record.createdAt) >= thirtyDaysAgo;
  });

  const deletedCount = records.length - activeRecords.length;

  await fs.writeFile(
    recordsPath,
    JSON.stringify(activeRecords, null, 2)
  );

  console.log(`Deleted ${deletedCount} stale records.`);

  return {
    message: "Stale records cleanup completed",
    deletedCount
  };
}

// TASK 2: Send a daily email summary
async function sendEmailSummary() {
  console.log("Preparing daily email summary...");

  const fileContent = await fs.readFile(recordsPath, "utf8");
  const records = JSON.parse(fileContent);

  const summary = `
    Daily System Summary

    Date: ${new Date().toLocaleString()}
    Total active records: ${records.length}

    This is your automated system summary.
  `;

  // Only send an email if SMTP settings are configured.
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.EMAIL_TO
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: "Daily System Summary",
      text: summary
    });

    console.log("Summary email sent successfully.");

    return {
      message: "Summary email sent successfully",
      totalRecords: records.length,
      emailSent: true
    };
  }

  // If email settings are missing, simulate the email.
  console.log("Email settings are missing. Summary preview:");
  console.log(summary);

  return {
    message: "Summary generated. Email not sent because SMTP is not configured.",
    totalRecords: records.length,
    emailSent: false,
    summary
  };
}

module.exports = {
  deleteStaleRecords,
  sendEmailSummary
};
