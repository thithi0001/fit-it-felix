import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller.js";
import { authenticate, authorize } from "../../../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { 
    createNotificationValidation,
    requireNotificationOwnerShip
} from "../middlewares/notification.middleware.js";

const router = Router();

router.get("/health", NotificationController.health);

router.post(
    "/",
    authenticate(),
    createNotificationValidation,
    NotificationController.create
);
router.get(
    "/",
    authenticate(),
    authorize(ROLES.ADMIN),
    NotificationController.list
);
router.get(
    "/employees/:employeeId",
    authenticate(),
    requireNotificationOwnerShip,
    NotificationController.getByEmployeeId
);
router.get(
    "/:id",
    authenticate(),
    requireNotificationOwnerShip,
    NotificationController.getById
);
router.put(
    "/:id",
    authenticate(),
    requireNotificationOwnerShip,
    NotificationController.update
);

export default router;