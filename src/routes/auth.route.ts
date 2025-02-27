import { Router } from "express";
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
} from "../validators/auth.validator";
import {
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controllers";
import { validateRequest } from "../middlewares/validation.middleware";

const router = Router();

router.post("/register", validateRegister, validateRequest, registerUser);
router.post("/login", validateLogin, validateRequest, loginUser);
router.post(
  "/forget-password",
  validateForgotPassword,
  validateRequest,
  forgetPassword
);
router.post(
  "/reset-password",
  validateResetPassword,
  validateRequest,
  resetPassword
);

export default router;
