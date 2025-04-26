import { zoltraConfig } from "zoltra";

export default zoltraConfig({
  PORT: 5000,
  LOG_LEVEL: "info",
  NODE_ENV: "development",
  experimental: {
    router: {
      cache: {
        enabled: false,
      },
    },
  },
  error: {
    displayErrObj: false,
    showStack: false,
    includeErrorMessage: true,
  },
});
