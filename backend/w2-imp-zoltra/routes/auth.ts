import { defineRoutes } from "zoltra";
import {
  registerUser,
  resetPassword,
  signIn,
} from "../controllers/auth.controller";
import validateFields from "../middleware/vaildateFields";
import validateEmail from "../middleware/vaildateEmail";

export const routes = defineRoutes([
  {
    path: "/v1/auth/sign-in",
    method: "POST",
    middleware: [validateFields(["email", "password"]), validateEmail],
    handler: signIn,
  },
  {
    path: "/v1/auth/sign-up",
    method: "POST",
    handler: registerUser,
    middleware: [
      validateFields([
        "email",
        "firstname",
        "lastname",
        "password",
        "username",
      ]),
      validateEmail,
    ],
  },
  {
    path: "/v1/auth/reset-password",
    method: "POST",
    handler: resetPassword,
    middleware: [validateFields(["email"])],
  },
]);
