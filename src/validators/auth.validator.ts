import { body, ValidationChain } from "express-validator";

// Validation for user registration
export const validateRegister: ValidationChain[] = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
  body("referral_code")
    .optional()
    .trim()
    .isString()
    .withMessage("Referral code must be a string"),
];

// Validation for user login
export const validateLogin: ValidationChain[] = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

// Validation for forgot password
export const validateForgotPassword: ValidationChain[] = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
];

// Validation for reset password
export const validateResetPassword = [
  body("token").notEmpty().withMessage("Reset token required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain at least one number"),
];
