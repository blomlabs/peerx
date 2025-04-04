import { ZoltraConfig, zoltraConfig } from "zoltra";

export default zoltraConfig({
  PORT: 8000,
  LOG_LEVEL: "debug",
  NODE_ENV: String(process.env.NODE_ENV) as ZoltraConfig["NODE_ENV"],
});
