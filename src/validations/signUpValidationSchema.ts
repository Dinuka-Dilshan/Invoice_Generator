import { checkSchema } from "express-validator";

export default checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid Email",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
    toLowerCase: true,
  },
  password: {
    in: ["body"],
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "minimum length is 8",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
});
