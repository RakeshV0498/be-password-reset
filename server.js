import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import mongooseConnect from "./db-utils/dbConnection.js";
import productRouter from "./routes/products.js";
import registerRouter from "./routes/auth/register.js";
import loginRouter from "./routes/auth/login.js";
import forgotPassRouter from "./routes/auth/forgotPassword.js";
import resetPassRouter from "./routes/auth/resetPassword.js";

const server = express();
const port = 8100;

dotenv.config();

mongooseConnect();

server.use(express.json());

server.use(cors());

server.use("/products", productRouter);
server.use("/register", registerRouter);
server.use("/login", loginRouter);
server.use("/forgot-password", forgotPassRouter);
server.use("/reset-password", resetPassRouter);

server.listen(port, () => {
  console.log(`${Date().toString()} - server listening on port ${port}`);
});
