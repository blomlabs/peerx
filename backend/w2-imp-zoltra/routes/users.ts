import { defineRoutes } from "zoltra";
import { getUserById, getUsers } from "../controllers/users.controller";

const userRoutes = defineRoutes([
  {
    method: "GET",
    path: "/api/users",
    handler: getUsers,
    middleware: [],
  },
  {
    method: "GET",
    path: "/api/users/:id",
    handler: getUserById,
  },
]);

export const routes = userRoutes;
