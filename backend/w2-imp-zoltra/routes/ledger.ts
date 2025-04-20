import { defineRoutes } from "zoltra";
import {
  getLedgerByAddress,
  getLedgerById,
  getLedgerByTransactionId,
  getLedgers,
} from "../controllers/ledger.controller";
import authorizeAdmin from "../middleware/admin.middleware";

export const routes = defineRoutes([
  {
    method: "GET",
    path: "/v1/ledger/fetch-all",
    handler: getLedgers,
    middleware: [authorizeAdmin],
  },
  {
    method: "GET",
    path: "/v1/ledger/fetch-user/:address",
    handler: getLedgerByAddress,
    middleware: [authorizeAdmin],
  },
  {
    method: "GET",
    path: "/v1/ledger/fetch-single/:id",
    handler: getLedgerById,
    middleware: [authorizeAdmin],
  },
  {
    method: "GET",
    path: "/v1/ledger/fetch-transaction/:transactionId",
    handler: getLedgerByTransactionId,
    middleware: [authorizeAdmin],
  },
]);
