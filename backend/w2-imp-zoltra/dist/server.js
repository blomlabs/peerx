"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zoltra_1 = require("zoltra");
const logger = new zoltra_1.Logger("Server");
async function startServer() {
    try {
        // if (cluster.isPrimary) {
        //   for (let i = 0; i < cpus().length; i++) {
        //     cluster.fork();
        //   }
        // } else {//
        const app = new zoltra_1.App();
        await app.start();
        // }
    }
    catch (error) {
        logger.error("Failed to start server", error);
        process.exit(1);
    }
}
startServer();
