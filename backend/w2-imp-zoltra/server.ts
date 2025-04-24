import { App, CorsPlugin, Logger } from "zoltra";
import { errorPlugin } from "./plugins/error";
import { arcjetPlugin } from "./plugins/arcjet";

const logger = new Logger("Server");

async function startServer() {
  try {
    const app = new App();

    app.register(CorsPlugin());
    app.register(arcjetPlugin);
    // app.register(encryptRes);
    app.register(errorPlugin);

    await app.start();
  } catch (error) {
    logger.error("Failed to start server", error as Error);
    process.exit(1);
  }
}

startServer();
