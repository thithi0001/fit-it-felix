import { Router } from "express";
import { authenticate, authorize } from "../../../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { HealthController } from "../controllers/health.controller.js";
import { ConversationController } from "../controllers/conversation.controller.js";
import { MessageController } from "../controllers/message.controller.js";

const router = Router();

router.get("/health", HealthController.health);



export default router;