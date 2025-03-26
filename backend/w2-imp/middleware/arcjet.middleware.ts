import { NexuHandler } from "nexujs";
import Err from "../config/err";
import aj from "../config/acrjet";

const arcjetMiddleware: NexuHandler = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res
          .status(429)
          .json({ error: "Rate limit exceeded", message: "Too Many Requests" });
      if (decision.reason.isBot())
        return res
          .status(403)
          .json({ error: "Bot Detected", message: "No bots allowed" });

      return res
        .status(403)
        .json({ error: "Access Denied", message: "Forbidden Request" });
    }

    next();
  } catch (error) {
    const err = new Err((error as Error).message, "Arcjet Middleware Error");
    err.statusCode = 500;
    next(error);
  }
};

export default arcjetMiddleware;
