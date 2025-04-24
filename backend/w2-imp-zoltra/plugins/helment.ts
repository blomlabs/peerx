import helmet, { HelmetOptions } from "helmet";
import { createPlugin } from "zoltra";

export const helmetPlugin = (options?: Readonly<HelmetOptions>) => {
  return createPlugin({
    name: "helment",
    install(app) {
      app.addMiddleware(async (req, res, next) =>
        helmet(options)(req, res, next)
      );
    },
  });
};
