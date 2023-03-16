export type LoggedInUser = {
  name: string;
  email: string;
  settings: {
    hourlyPayRate: Number | undefined;
  };
};
