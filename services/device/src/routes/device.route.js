import { Router } from "express";
import { DeviceController } from "../controllers/device.controller.js";

const router = Router();

router.get("/health", DeviceController.health);



export default router;