import { checkSchema } from "express-validator";

export default checkSchema({
  endTime: {
    in: ["body"],
    notEmpty: {
      errorMessage: "End time is required",
    },
  },
  date: {
    in: ["body"],
    notEmpty: {
      errorMessage: "date is required",
    },
  },
});
