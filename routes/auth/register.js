import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../../db-utils/models.js";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const userData = req.body;

  const userObj = await userModel.findOne({ email: userData.email });

  if (userObj) {
    return res
      .status(404)
      .send({ msg: "User Already registered, Please Login", code: -2 });
  } else {
    bcrypt.hash(userData.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).send({
          msg: "something went wrong, please try again later",
          code: -1,
        });
      }
      await userModel.create({
        ...userData,
        id: Date.now().toString(),
        password: hash,
      });

      return res.send({ msg: "User registered successfully" });
    });
  }
});

export default registerRouter;
