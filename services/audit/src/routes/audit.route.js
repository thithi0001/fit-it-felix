import { Router } from "express";
import { AuditController } from "../controllers/audit.controller.js";

const router = Router();

router.get("/health", AuditController.health);

export default router;