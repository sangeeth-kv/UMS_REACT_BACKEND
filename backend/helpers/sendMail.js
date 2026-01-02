const logger = require("../config/logger");
const sendOtpEmail = require("../services/otpEmailService");
const transporter=require("../config/nodeMailer")

async function sendMail(job) {
  console.log("📩 Job received:", job.name, job.id);

     if (job.name === "sendEmailOtp") {
        console.log("✅ Job reached sendMail function", job.data);
        const { email, otp } = job.data;
        await sendOtpEmail(email,otp)
        return { status: "sent" }; 
    }

    return true;

}

module.exports = sendMail;
