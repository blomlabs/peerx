import { app, sendContent } from "nexujs";
import { errorMiddleWare } from "./middleware/error.middleware";
import AuthRoutes from "./routes/auth";
import UserRoute from "./routes/users";
import TransactionRoute from "./routes/transaction";
import LedgerRoute from "./routes/ledger";
import OrderRoute from "./routes/order";
import arcjetMiddleware from "./middleware/arcjet.middleware";
import ListingRoute from "./routes/listing";

app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.send(sendContent);
});

app.use("/v1/auth", AuthRoutes);
app.use("/v1/users", UserRoute);
app.use("/v1/transaction", TransactionRoute);
app.use("/v1/ledger", LedgerRoute);
app.use("/v1/orders", OrderRoute);
app.use("/v1/listings", ListingRoute);

app.use(errorMiddleWare);
// app.use(ErrorLogger);

export default app;
