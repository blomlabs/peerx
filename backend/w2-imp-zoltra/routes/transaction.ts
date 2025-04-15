import { defineRoutes } from "zoltra";
import { transferToken } from "../controllers/transaction.controller";
import authorize from "../middleware/auth.middleware";

export const routes = defineRoutes([
  {
    method: "POST",
    path: "/v1/transactions/transfer",
    handler: transferToken,
    middleware: [authorize],
  },
]);
