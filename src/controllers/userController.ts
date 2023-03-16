import bycrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { LoggedInUser } from "../types/auth.js";
import { errorResponse } from "../utils/error.js";

export const signUp = async (
  req: Request<{}, {}, { email: string; password: string; name: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email, name } = req.body;

    const isEmailAvailable = await User.findOne({ email });

    if (isEmailAvailable) {
      return next(
        errorResponse({ errorCode: 409, message: "Email already in use" })
      );
    }

    const hashedPassword = await bycrypt.hash(password, 12);

    await new User({
      email,
      password: hashedPassword,
      name,
    }).save();

    res.json({ message: "Account Creation successful" });
  } catch (error) {
    next(errorResponse("internalError"));
  }
};

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = req.body;

    const foundUser = await User.findOne(
      { email },
      { paymentRecords: 0, workRecords: 0 }
    );

    if (!foundUser) {
      return next(errorResponse("unAuthorized"));
    }

    const isPasswordValid = await bycrypt.compare(
      password,
      foundUser.password as string
    );

    if (!isPasswordValid) {
      return next(errorResponse("unAuthorized"));
    }

    jwt.sign(
      {
        email: foundUser.email,
        name: foundUser.name,
        settings: foundUser.settings,
      } as LoggedInUser,
      process.env.JWT_SECRET as string,
      { algorithm: "HS256", expiresIn: "7d" },
      (err, token) => {
        if (err) {
          next(errorResponse("internalError"));
        }
        res.json({
          token,
          email: foundUser.email,
          name: foundUser.name,
          settings: foundUser.settings,
        });
      }
    );
  } catch (error) {
    next(errorResponse("internalError"));
  }
};
