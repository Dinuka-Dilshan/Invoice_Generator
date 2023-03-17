export type WorkingSessionResult = {
  workRecords: {
    date: string;
    _id: string;
    records: {
      startTime: string;
      status: string;
      _id: string;
      endTime: string;
    }[];
  }[];
};
