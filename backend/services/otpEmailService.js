const logger = require("../config/logger")
const transporter=require("../config/nodeMailer")

async function sendOtpEmail(email,otp) {
     console.log("📨 Sending OTP email to:", email);
    try {
         const info = await transporter.sendMail({
            from: `UMS Admin <${process.env.ADMIN_EMAIL}>`,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. This code will expire in 5 minutes.`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Email Verification</h2>
                <p>Hello,</p>
                <p>Your One-Time Password (OTP) is:</p>

                <p style="
                  font-size: 24px;
                  font-weight: bold;
                  letter-spacing: 4px;
                  color: #2c3e50;
                ">
                  ${otp}
                </p>

                <p>This OTP is valid for <strong>5 minutes</strong>.</p>
                <p>If you did not request this, please ignore this email.</p>

                <hr />
                <p style="font-size: 12px; color: #777;">
                  © ${new Date().getFullYear()} UMS. All rights reserved.
                </p>
              </div>
            `,
        });

        console.log("worked sendOtpEmail 2")
        logger.debug(`OTP sent successfully: ${info.messageId}`);
        return info;
    } catch (error) {
        logger.error(`error in sendOtpEmail : ${error}`)
    }
}

module.exports=sendOtpEmail