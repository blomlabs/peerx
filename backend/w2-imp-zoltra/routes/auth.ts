import { defineRoutes } from "zoltra";
import { signIn } from "../controllers/auth.controller";
import validateFields from "../middleware/vaildateFields";

export const routes = defineRoutes([
  {
    path: "/v1/auth/sign-in",
    method: "POST",
    handler: signIn,

    middleware: [validateFields(["email", "password"])],
  },
]);
