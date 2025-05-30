import nodemailer from "nodemailer";
import axios from "axios";

export const sendEmailOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Agroww" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendSmsOTP = async (phone, otp) => {
  const apiKey = process.env.FAST2SMS_API_KEY;
  await axios.post(
    "https://www.fast2sms.com/dev/bulkV2",
    {
      variables_values: otp,
      route: "otp",
      numbers: phone,
    },
    {
      headers: {
        authorization: apiKey,
      },
    }
  );
};
