import { NextFunction, Request, Response } from "express";
import { WORK_RECORD_STATUS } from "../constants/user.js";
import User from "../models/User.js";
import { errorResponse } from "../utils/error.js";

export const startDayWork = async (
  req: Request<{}, {}, { startTime: Date; date: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = req.body.date;

    const result = await User.findOneAndUpdate(
      { email: req.user?.email, "workRecords.date": { $ne: today } },
      {
        $push: {
          workRecords: {
            date: today,
            records: [
              {
                startTime: req.body.startTime,
                status: WORK_RECORD_STATUS.ongoing,
              },
            ],
          },
        },
      }
    );

    res.json({
      message: result ? "started working" : "Already work started for today",
    });
  } catch (error) {
    console.log(error);
    next(errorResponse("internalError"));
  }
};

export const completeOngoingWorkSession = async (
  req: Request<{}, {}, { endTime: Date; date: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = req.body.date;

    const result = await User.findOneAndUpdate(
      {
        email: req.user?.email,
        "workRecords.date": today,
        "workRecords.records.status": WORK_RECORD_STATUS.ongoing,
      },
      {
        $set: {
          "workRecords.$.records.$[elem].status": WORK_RECORD_STATUS.completed,
          "workRecords.$.records.$[elem].endTime": req.body.endTime,
        },
      },
      { arrayFilters: [{ "elem.status": WORK_RECORD_STATUS.ongoing }] }
    );

    res.json({
      message: result ? "work session completed" : "No active session to end",
    });
  } catch (error) {
    console.log(error);
    next(errorResponse("internalError"));
  }
};

export const startWorkSession = async (
  req: Request<{}, {}, { startTime: Date; date: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = req.body.date;
    const result = await User.findOneAndUpdate(
      {
        email: req.user?.email,
        "workRecords.date": today,
        "workRecords.records.status": { $ne: WORK_RECORD_STATUS.ongoing },
      },
      {
        $push: {
          "workRecords.$.records": {
            startTime: req.body.startTime,
            status: WORK_RECORD_STATUS.ongoing,
          },
        },
      }
    );

    res.json({
      message: result
        ? "started working"
        : "Cannot start new session while another session is active",
    });
  } catch (error) {
    console.log(error);
    next(errorResponse("internalError"));
  }
};
