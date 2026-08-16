import { Router } from "express";
import { MaintenanceController } from "../controllers/maintenance.controller.js";

const router = Router();

router.get("/health", MaintenanceController.health);

export default router;