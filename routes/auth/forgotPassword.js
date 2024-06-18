import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { userModel } from "../../db-utils/models.js";
import { mailOptions, transporter } from "../../mail-utils/mail-utils.js";

dotenv.config();

const forgotPassRouter = express.Router();

forgotPassRouter.post("/", async (req, res) => {
  const { email } = req.body;
  const feURL = process.env.FE_URL || "";

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const newMailOptions = {
      ...mailOptions,
      to: user.email,
      html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click on the following link to reset your password:</p>
      <p><a href=${feURL}/reset-password/${resetToken}>Reset Password</a></p>
      <p>If you did not request this password reset, please ignore this email.</p>
      <p>Thank you.</p>
    `,
    };

    transporter.sendMail(newMailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ msg: "Error sending email" });
      }
      res.status(200).send({ msg: "Email sent successfully" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Something went wrong, Please try again later" });
  }
});

export default forgotPassRouter;
