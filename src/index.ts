import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { auth } from "./middlewares/auth.js";
import userRoutes from "./Routes/userRoutes.js";
import workRoutes from "./Routes/workRoutes.js";
import { errorResponse } from "./utils/error.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.use(auth);
app.use("/work", workRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.errorCode) {
    return res.status(err.errorCode).json(err);
  } else {
    return res.status(400).json(errorResponse("badRequest"));
  }
});

mongoose
  .connect(process.env.DATABASE as string)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
