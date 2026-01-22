const logger = require("../config/logger")
const transporter=require("../config/nodeMailer")

async function sendResetLinkEmail(email,resetLink) {
     console.log("📨 Sending reset password email to:", email);
     try {
        const info=await transporter.sendMail({
            from: `UMS Admin <${process.env.ADMIN_EMAIL}>`,
             to: email,
             subject: "Reset your password",
             html: `
      <p>Click below to reset your password</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes</p>
    `

        });
     } catch (error) {
        logger.error(`error in sendOtpEmail : ${error}`)
     }
}

module.exports=sendResetLinkEmail