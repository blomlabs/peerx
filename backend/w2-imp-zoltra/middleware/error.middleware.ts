import { Logger, RequestError, ZoltraRequest, ZoltraResponse } from "zoltra";

type ErrorMiddleWare = (
  err: RequestError,
  req: ZoltraRequest,
  res: ZoltraResponse,
  next: (arg?: any) => Promise<void>
) => void;
const logger = new Logger("ErrorMiddleware");
export const errorMiddleWare: ErrorMiddleWare = (err, req, res, next) => {
  try {
    let error = {
      ...err,
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
    };

    // console.log(error.stack);

    logger.error("Middleware Error", error);

    return;
  } catch (internalError) {
    next(internalError);
  }
};
