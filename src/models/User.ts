import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  workRecords: [
    {
      date: Date,
      records: [{ startTime: Date, endTime: Date, status: String }],
    },
  ],
  paymentRecords: [
    {
      startDate: Date,
      endDate: Date,
      amountLKR: Number,
      nonWorkingDays: [Date],
    },
  ],
  settings: {
    hourlyPayRate: Number,
  },
});

export default mongoose.model("User", userSchema);
