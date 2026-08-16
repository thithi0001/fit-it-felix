import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller.js";

const router = Router();

router.get("/health", NotificationController.health);

export default router;