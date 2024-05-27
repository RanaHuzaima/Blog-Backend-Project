import { Router } from "express";
import { handleCreateUser, handleLoggingUser, handleLogoutUser, handleUserSignUp, handleUserSignin } from "../controllers/user.controller.js";

const router = Router()

router.route("/signin").get(handleUserSignin).post(handleLoggingUser)
router.route("/signup").get(handleUserSignUp).post(handleCreateUser)
router.route("/logout").get(handleLogoutUser)

export default router