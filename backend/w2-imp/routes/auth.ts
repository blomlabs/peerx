import {
  registerUser,
  resetPassword,
  signIn,
} from "../controllers/auth.controller";
import { nexuRouter, validateEmail, validateFields } from "nexujs";

const AuthRoutes = nexuRouter;

AuthRoutes.post(
  "/sign-up",
  validateFields(["email", "firstname", "lastname", "password", "username"]),
  validateEmail,
  registerUser
);

AuthRoutes.post(
  "/sign-in",
  validateFields(["password", "email"]),
  validateEmail,
  signIn
);

AuthRoutes.post(
  "/reset-password",
  validateFields(["email"]),
  validateEmail,
  resetPassword
);

export = AuthRoutes;
