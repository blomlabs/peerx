import { defineRoutes } from "zoltra";
import { getUsers } from "../controllers/users.controller";

const userRoutes = defineRoutes([
  {
    method: "GET",
    path: "/api/users",
    handler: getUsers,
  },
]);

export const routes = userRoutes;
