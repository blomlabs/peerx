import { defineRoutes } from "zoltra";
import {
  getTransaction,
  getTransactions,
  getUserTransactions,
  transferToken,
} from "../controllers/transaction.controller";
import authorize from "../middleware/auth.middleware";
import validateFields from "../middleware/vaildateFields";

export const routes = defineRoutes([
  {
    method: "POST",
    path: "/v1/transactions/transfer",
    handler: transferToken,
    middleware: [authorize, validateFields(["address", "currency", "amount"])],
  },
  {
    method: "GET",
    path: "/v1/transactions",
    handler: getTransactions,
  },
  {
    method: "GET",
    path: "/v1/transactions/all/user/:address",
    handler: getUserTransactions,
  },
  {
    method: "GET",
    path: "/v1/transactions/view/:id",
    handler: getTransaction,
  },
]);
