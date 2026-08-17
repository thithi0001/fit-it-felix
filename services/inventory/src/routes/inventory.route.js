import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller.js";
import { authenticate, authorize } from "../../../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";

const router = Router();

router.get('/health', InventoryController.health);

// get inventory list
router.get(
    '/',
    authenticate(),
    InventoryController.listInventory
);

// get inventory by id
router.get(
    '/:id',
    authenticate(),
    InventoryController.getInventoryById
);

// get item request list
router.get(
    '/item-requests',
    authenticate(),
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    InventoryController.listRequest
);

// get item request by id
router.get(
    '/item-requests/:id',
    authenticate(),
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.TECHNICIAN),
    // ownership for TECHNICIAN => chỉ xem request do mình tạo
    InventoryController.getRequestById
);

// get item request by plan id
router.get(
    '/item-requests/plans/:planId',
    authenticate(),
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.TECHNICIAN),
    InventoryController.getRequestByPlanId
);

// approve item request
router.put(
    '/item-requests/:id',
    authenticate(),
    authorize(ROLES.MANAGER),
    // validate
    InventoryController.approveRequest
);

// create item request
router.post(
    '/item-requests',
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    // validate
    InventoryController.createRequest
);

export default router;