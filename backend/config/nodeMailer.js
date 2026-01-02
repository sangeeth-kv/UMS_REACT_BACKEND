const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
const nodemailer = require("nodemailer");


console.log("📧 Loading nodemailer config...");
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mail transporter error:", error);
  } else {
    console.log("✅ Mail server is ready to send emails");
  }
});

module.exports=transporter