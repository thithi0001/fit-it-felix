import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate, validateLogin, validateRefreshToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/health", AuthController.health);
router.post("/login", validateLogin, AuthController.login);
router.post("/refresh", validateRefreshToken, AuthController.refresh);
router.post("/logout", authenticate, AuthController.logout);
router.get("/me", authenticate, AuthController.me);

export default router;