import express from "express";
import { productModel } from "../db-utils/models.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const data = await productModel.find({});
    return res.send(data);
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "MongoDB service is stopped, Please try again later" });
  }
});

export default productRouter;
