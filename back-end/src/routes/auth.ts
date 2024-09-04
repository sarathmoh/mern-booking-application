import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult, check } from "express-validator";
import bcrypt from "bcryptjs";
const router = express.Router();
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more character is required"
    ).isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(400).json({
          message: error.array(),
        });
      }
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      }
      const token = jwt.sign(
        {
          userID: user.id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.sendStatus(200).json({ userID: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
);

export default router;
