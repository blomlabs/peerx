import { defineRoutes } from "zoltra";
import {
  createOrder,
  getOrders,
  getUserOrders,
  viewOrder,
} from "../controllers/order.controller";
import authorize from "../middleware/auth.middleware";

export const routes = defineRoutes([
  {
    method: "POST",
    path: "/v1/orders/new",
    handler: createOrder,
    middleware: [authorize],
  },
  {
    method: "GET",
    path: "/v1/orders/:orderId",
    handler: viewOrder,
  },
  {
    method: "GET",
    path: "/v1/orders/user/:userId",
    handler: getUserOrders,
  },
  {
    method: "GET",
    path: "/v1/orders",
    handler: getOrders,
  },
]);
