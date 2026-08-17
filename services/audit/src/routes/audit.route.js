import { Router } from "express";
import { AuditController } from "../controllers/audit.controller.js";
import { authenticate, authorize } from "../../../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";

const router = Router();

router.get("/health", AuditController.health);

router.get("/:id", authenticate, authorize(ROLES.ADMIN), AuditController.getById);

router.get("/", authenticate, authorize(ROLES.ADMIN), AuditController.list);

router.post("/", authenticate, AuditController.create);

export default router;