import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller.js";

const router = Router();

router.get('/health', InventoryController.health);

export default router;