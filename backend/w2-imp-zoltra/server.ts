// import cluster from "node:cluster";
// import { cpus } from "node:os";
import { App, Logger } from "zoltra";
import { errorPlugin } from "./plugins/error";
import { encryptRes } from "./plugins/encrypt-response";
import { arcjetPlugin } from "./plugins/arcjet";

const logger = new Logger("Server");

async function startServer() {
  try {
    // if (cluster.isPrimary) {
    //   for (let i = 0; i < cpus().length; i++) {
    //     cluster.fork();
    //   }
    // } else {//
    const app = new App();

    app.register(arcjetPlugin);
    app.register(encryptRes);
    app.register(errorPlugin);

    await app.start();
    // }
  } catch (error) {
    logger.error("Failed to start server", error as Error);
    process.exit(1);
  }
}

startServer();
