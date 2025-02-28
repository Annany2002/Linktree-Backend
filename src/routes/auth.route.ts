import path from "path";
import { Router } from "express";
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResendVerification,
  validateResetPassword,
} from "../validators/auth.validator";
import {
  forgetPassword,
  loginUser,
  registerUser,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controllers";
import { validateRequest } from "../middlewares/validation.middleware";

const router = Router();

router.post("/register", validateRegister, validateRequest, registerUser);
router.post("/login", validateLogin, validateRequest, loginUser);

router.get("/verify-email", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/verify-email.html"));
});

router.post("/verify-email", validateRequest, verifyEmail);

router.post(
  "/resend-verification",
  validateResendVerification,
  validateRequest,
  resendVerification
);

router.post(
  "/forget-password",
  validateForgotPassword,
  validateRequest,
  forgetPassword
);
router.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/reset-password.html"));
});
router.post(
  "/reset-password",
  validateResetPassword,
  validateRequest,
  resetPassword
);

export default router;
