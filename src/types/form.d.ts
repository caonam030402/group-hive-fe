import type { AuthValidation } from "@/validations";

type IFormTypeRegister = Pick<
  AuthValidation,
  "email" | "password" | "firstName" | "lastName" | "confirmPassword"
>;

type IFormTypeLogin = Pick<AuthValidation, "email" | "password">;

type IFormTypeAuth = IFormTypeRegister & IFormTypeLogin;
