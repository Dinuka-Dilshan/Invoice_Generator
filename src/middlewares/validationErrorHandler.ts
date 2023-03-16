import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createValidationErrorResponse,
  errorResponse,
} from "../utils/error.js";

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      errorResponse({
        errorCode: 400,
        message: createValidationErrorResponse(errors),
      })
    );
  } else {
    next();
  }
};
