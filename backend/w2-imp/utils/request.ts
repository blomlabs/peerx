import Err from "../config/err";

export const throwIfInvalid = (
  condition: boolean,
  message: string,
  errName: string,
  statusCode?: number
) => {
  if (condition) {
    const error = new Err(message, errName);
    error.statusCode = statusCode || 403;
    throw error;
  }
};
