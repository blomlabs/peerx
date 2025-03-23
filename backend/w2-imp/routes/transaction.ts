import { nexuRouter, validateFields, validateParams } from "nexujs";
import authorize from "../middleware/auth.middleware";
import {
  getTransaction,
  getTransactions,
  getUserTransactions,
  transferToken,
} from "../controllers/transaction.controller";
import authorizeAdmin from "../middleware/admin.middleware";

const TransactionRoute = nexuRouter;

TransactionRoute.post(
  "/transfer",
  authorize,
  validateFields(["address", "currency", "amount"]),
  transferToken
);

// TODO: Remove the authorizeAdmin
TransactionRoute.get("/all", authorizeAdmin, getTransactions);

TransactionRoute.get(
  "/all/user/:address",
  authorize,
  validateParams(["address"]),
  getUserTransactions
);

TransactionRoute.get("/view/:id", authorize, getTransaction);

export default TransactionRoute;
