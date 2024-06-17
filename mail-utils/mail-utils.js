import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rockr1204@gmail.com",
    pass: process.env.EMAIL_APP_KEY || "",
  },
});

const mailOptions = {
  from: "rockr1204@gmail.com",
  to: ["rockr4674@gmail.com"],
  subject: "Reset Password",
  html: "",
};

export { transporter, mailOptions };
