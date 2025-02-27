import { Router } from "express";
import userRouter from "./auth.route";
import referralRouter from "./referral.route";

export const router = Router();

router.use("/auth/user", userRouter);
router.use("/referral", referralRouter);
