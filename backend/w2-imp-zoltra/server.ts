import { Zoltra, corsPlugin, Logger } from "zoltra";
import { errorPlugin } from "./plugins/error";
import { arcjetPlugin } from "./plugins/arcjet";
import { helmetPlugin } from "./plugins/helment";

const logger = new Logger("Server");

async function startServer() {
  try {
    const app = new Zoltra();

    app.register(corsPlugin());
    // app.register(arcjetPlugin);
    // app.register(encryptRes);
    app.register(errorPlugin);
    app.register(helmetPlugin());

    await app.start();
  } catch (error) {
    const err = error as Error;
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
}

startServer();
