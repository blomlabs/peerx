import { defineRoutes } from "zoltra";
import { getUserById, getUsers } from "../controllers/users.controller";
// import zoltraConfig from "../zoltra.config.js";

const userRoutes = defineRoutes([
  {
    method: "GET",
    path: "/api/users",
    handler: getUsers,
  },
  {
    method: "GET",
    path: "",
    handler: getUserById,
  },
]);

// export default userRoutes;
export const routes = userRoutes;
