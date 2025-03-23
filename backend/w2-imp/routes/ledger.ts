import { nexuRouter } from "nexujs";
import authorizeAdmin from "../middleware/admin.middleware";
import {
  getLedgerByAddress,
  getLedgerById,
  getLedgerByTransactionId,
  getLedgers,
} from "../controllers/ledger.controller";

const LedgerRoute = nexuRouter;

LedgerRoute.get("/fetch-all", authorizeAdmin, getLedgers);

LedgerRoute.get("/fetch-user/:address", authorizeAdmin, getLedgerByAddress);

LedgerRoute.get("/fetch-single/:id", authorizeAdmin, getLedgerById);

LedgerRoute.get(
  "/fetch-transaction/:transactionId",
  authorizeAdmin,
  getLedgerByTransactionId
);

export default LedgerRoute;
