import { checkSchema } from "express-validator";

export default checkSchema({
  date: {
    in: ["body"],
    notEmpty: {
      errorMessage: "date is required",
    },
  },
});
