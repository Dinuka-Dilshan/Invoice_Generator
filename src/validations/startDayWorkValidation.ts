import { checkSchema } from "express-validator";

export default checkSchema({
  startTime: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Start time is required",
    },
  },
  date: {
    in: ["body"],
    notEmpty: {
      errorMessage: "date is required",
    },
  },
});
