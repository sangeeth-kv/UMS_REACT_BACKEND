const logger = require("../config/logger");
const sendOtpEmail = require("../services/otpEmailService");
const transporter=require("../config/nodeMailer");
const sendResetLinkEmail = require("../services/resetpasswordlinkService");

async function sendMail(job) {
  console.log("📩 Job received:", job.name, job.id);

     if (job.name === "sendEmailOtp") {
        console.log("✅ Job reached sendMail function", job.data);
        const { email, otp } = job.data;
        await sendOtpEmail(email,otp)
        return { status: "sent" }; 
    }else if(job.name==="sendEmailResetLink"){
      console.log('✅ Job reached sendMail reset link function',job.data)
      const {email,resetLink}=job.data
      await sendResetLinkEmail(email,resetLink)
      return {status:"sent"}
    }

    return true;

}

module.exports = sendMail;
