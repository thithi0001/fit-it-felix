import { Router } from "express";
import { AuditController } from "../controllers/audit.controller.js";

const router = Router();

router.get("/health", AuditController.health);

router.get("/:id", AuditController.getById);

router.get("/", AuditController.list);

router.post("/", AuditController.create);

export default router;