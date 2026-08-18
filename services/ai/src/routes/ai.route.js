import { Router } from "express";
import { authenticate, authorize } from "../../../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { HealthController } from "../controllers/health.controller.js";
import { ConversationController } from "../controllers/conversation.controller.js";
import { MessageController } from "../controllers/message.controller.js";

const router = Router();

router.get("/health", HealthController.health);

router.post(
    "/conversations",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    ConversationController.create
);

router.get(
    "/conversations",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    ConversationController.getConversations
);

router.get(
    "/conversations/:id",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    ConversationController.getConversationById
);

router.delete(
    "/conversations/:id",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    ConversationController.deleteConversationById
);

router.post(
    "/conversations/:conversationId/messages",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    MessageController.sendMessage
);

router.get(
    "/conversations/:conversationId/messages",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    MessageController.getMessages
);

export default router;