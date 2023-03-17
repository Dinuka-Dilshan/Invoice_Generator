import express from "express";
import { workingSessionsOfDayController } from "../controllers/insightController.js";
const router = express.Router();

router.get("/:month/:day/:year", workingSessionsOfDayController);

export default router;
