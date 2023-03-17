import { formatDistanceStrict } from "date-fns";
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { WorkingSessionResult } from "../types/insight.js";
import { errorResponse } from "../utils/error.js";

export const workingSessionsOfDayController = async (
  req: Request<{ day: string; month: string; year: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user!;
    const today = `${req.params.month}/${req.params.day}/${req.params.year}`;
    const data = await User.aggregate<WorkingSessionResult>([
      { $match: { email } },
      { $project: { workRecords: 1 } },
      { $match: { "workRecords.date": new Date(today) } },
      { $project: { _id: 0 } },
    ]);

    const records = data[0]?.workRecords[0]?.records || [];
    const modifiedRecords = records.map((record) => {
      if (record.startTime && record.endTime) {
        const start = new Date(record.startTime);
        const end = new Date(record.endTime);
        const duration = formatDistanceStrict(start, end, {
          unit: "minute",
          addSuffix: false,
        });
        return { ...record, duration };
      }

      return record;
    });
    res.json(modifiedRecords);
  } catch (error) {
    next(errorResponse("internalError"));
  }
};
