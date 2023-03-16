import { Result, ValidationError } from "express-validator";

export const createValidationErrorResponse = (
  errors: Result<ValidationError>
) =>
  errors.array().reduce((message, error) => {
    return { ...message, [error.param]: error.msg };
  }, {});

const ERRORS  = {
  unAuthorized: {
    errorCode: 401,
    message: "Authentication Failed",
  },
  notFound: {
    errorCode: 404,
    message: "Not Found",
  },
  internalError: {
    errorCode: 500,
    message: "Internal Srver error",
  },
  badRequest: {
    errorCode: 400,
    message: "Bad Request",
  },
};

export const errorResponse = (
  error: keyof typeof ERRORS | { errorCode: number; message: any }
) => {
  if (typeof error === "string") {
    return ERRORS[error];
  } else {
    return error;
  }
};
