import { nexuRouter, validateParams } from "nexujs";
import { getUser, getUsers } from "../controllers/user.controller";

import authorizeAdmin from "../middleware/admin.middleware";

const UserRoute = nexuRouter;

UserRoute.get("/", authorizeAdmin, getUsers);
UserRoute.get("/one/:username", validateParams(["username"]), getUser);

export default UserRoute;
