import { createPlugin } from "zoltra";

export const encryptRes = createPlugin({
  name: "encrypt-json",
  install(app) {
    app.addMiddleware(async (req, res, next) => {
      try {
        const originalJson = res.json.bind(res);

        res.json = (data) => {
          // Run encryption here
          return originalJson({ data });
        };

        next();
      } catch (error) {
        const err = error as Error;
        res.status(400).json({
          success: false,
          message: err.message,
          error: "RequestEncryptErr",
        });
      }
    });
  },
});
