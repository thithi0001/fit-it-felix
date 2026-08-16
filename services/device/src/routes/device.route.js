import { Router } from "express";
import { DeviceController } from "../controllers/device.controller.js";
import { authenticate, authorize, requireEmployeeOwnership, validateUpdateEmployee } from "../middleware/user.middleware.js";

const router = Router();

router.get("/health", DeviceController.health);



export default router;