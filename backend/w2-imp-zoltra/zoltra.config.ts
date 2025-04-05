import { ZoltraConfig, zoltraConfig } from "zoltra";

export default zoltraConfig({
  PORT: 8000,
  LOG_LEVEL: "info",
  // NODE_ENV: String(process.env.NODE_ENV) as ZoltraConfig["NODE_ENV"],
  NODE_ENV: "development",
});
