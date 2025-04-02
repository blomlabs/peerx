import cluster from "node:cluster";
import { cpus } from "node:os";
import { App, Logger } from "zoltra";

const logger = new Logger("Server");

async function startServer() {
  try {
    // if (cluster.isPrimary) {
    //   for (let i = 0; i < cpus().length; i++) {
    //     cluster.fork();
    //   }
    // } else {//
    const app = new App();
    await app.start();
    // }
  } catch (error) {
    logger.error("Failed to start server", error as Error);
    process.exit(1);
  }
}

startServer();
