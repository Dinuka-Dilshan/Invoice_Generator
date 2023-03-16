import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { LoggedInUser } from "../types/auth.js";
import { errorResponse } from "../utils/error.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(errorResponse("unAuthorized"));
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
      if (error) {
        return next(errorResponse("unAuthorized"));
      } else {
        req.user = decoded as LoggedInUser;
        next();
      }
    });
  } catch (error) {
    next(errorResponse("unAuthorized"));
  }
};
