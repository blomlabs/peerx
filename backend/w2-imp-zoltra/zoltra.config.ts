import { zoltraConfig } from "zoltra";

export default zoltraConfig({
  PORT: 5000,
  LOG_LEVEL: "debug",
  NODE_ENV: "development",
  experimetal: {
    router: {
      cache: {
        enabled: false,
      },
    },
  },
});
