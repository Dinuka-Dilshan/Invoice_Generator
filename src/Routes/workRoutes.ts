import express from "express";
import {
  completeOngoingWorkSession,
  startDayWork,
  startWorkSession,
} from "../controllers/workController.js";
import validationErrorHandler from "../middlewares/validationErrorHandler.js";
import completeOngoingSessionValidation from "../validations/completeOngoingSessionValidation.js";
import startDayWorkValidation from "../validations/startDayWorkValidation.js";
import startWorkSessionValidation from "../validations/startWorkSessionValidation.js";
const router = express.Router();

router.post(
  "/startday",
  startDayWorkValidation,
  validationErrorHandler,
  startDayWork
);
router.post(
  "/endsession",
  completeOngoingSessionValidation,
  validationErrorHandler,
  completeOngoingWorkSession
);
router.post(
  "/startsession",
  startWorkSessionValidation,
  validationErrorHandler,
  startWorkSession
);

export default router;
