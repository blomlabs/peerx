import { defineRoutes } from "zoltra";
import { getUser, getUsers } from "../controllers/users.controller";
import authorizeAdmin from "../middleware/admin.middleware";

const userRoutes = defineRoutes([
  {
    method: "GET",
    path: "/v1/users",
    handler: getUsers,
    middleware: [authorizeAdmin],
  },
  {
    method: "GET",
    path: "/v1/users/one/:username",
    handler: getUser,
  },
]);

export const routes = userRoutes;
