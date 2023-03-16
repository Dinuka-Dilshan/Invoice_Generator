import { LoggedInUser } from "./src/types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: LoggedInUser;
    }
  }
}
