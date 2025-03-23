import { NexuNext, NexuRequest, NexuResponse, throwError } from "nexujs";

interface Err extends Error {
  statusCode?: number;
  code?: number | string;
  errors?: any;
}

type ErrorMiddleWare = (
  err: Err,
  req: NexuRequest,
  res: NexuResponse,
  next: NexuNext
) => void;

export const errorMiddleWare: ErrorMiddleWare = (err, req, res, next) => {
  try {
    let error = {
      ...err,
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
    };

    console.log(error.stack);

    const status = error.statusCode || "500";
    return throwError({
      status: status as any,
      error: error || "Server Error",
      res,
      success: false,
    });
  } catch (internalError) {
    next(internalError);
  }
};
