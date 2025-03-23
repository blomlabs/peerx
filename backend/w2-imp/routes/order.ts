import { nexuRouter } from "nexujs";
import authorize from "../middleware/auth.middleware";
import {
  createOrder,
  getOrders,
  getUserOrders,
  viewOrder,
} from "../controllers/order.controller";
import authorizeAdmin from "../middleware/admin.middleware";

const OrderRoute = nexuRouter;

OrderRoute.post("/new", authorize, createOrder);

OrderRoute.get("/:orderId", viewOrder);

OrderRoute.get("/user/:userId", authorize, getUserOrders);

OrderRoute.get("/all", authorizeAdmin, getOrders);

export default OrderRoute;
