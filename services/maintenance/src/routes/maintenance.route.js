import { Router } from "express";
import { MaintenanceController } from "../controllers/maintenance.controller.js";
import { authenticate, authorize } from "../../../../shared/middlewares/auth.middleware.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import {
    validateCreatePlan,
    validateUpdatePlan,
    validateCreateRepair,
    validateApproveRepair,
    validateCreateAdjustPlan,
    validateApproveAdjustPlan,
    validateCreateDamageReport,
    validateCreateMaintenanceRequest,
    validateApproveMaintenanceRequest,
    validateCreateAcceptanceReport,
    validateApproveAcceptanceReport,
} from "../middlewares/maintenance.middleware.js";

const router = Router();

router.get("/health", MaintenanceController.health);

// Plan routes
router.post(
    "/plans",
    authenticate(),
    authorize(ROLES.MANAGER),
    validateCreatePlan,
    MaintenanceController.createPlan
);

router.get(
    "/plans/status/:status",
    authenticate(),
    MaintenanceController.listPlansByStatus
);

router.get(
    "/plans/assignments/:employeeId",
    authenticate(),
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.TECHNICIAN),
    MaintenanceController.getPlansByAssignment
);

router.get(
    "/plans/:id",
    authenticate(),
    MaintenanceController.getPlanById
);

router.put(
    "/plans/:id",
    authenticate(),
    authorize(ROLES.MANAGER),
    validateUpdatePlan,
    MaintenanceController.updatePlan
);

router.get(
    "/plans/:id/documents",
    authenticate(),
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.TECHNICIAN),
    MaintenanceController.listAllPlanDocuments
);

router.put(
    "/plans/:id/start",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    MaintenanceController.startPlan
);

router.put(
    "/plans/:id/complete",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    MaintenanceController.completePlan
);

router.get(
    "/plans",
    authenticate(),
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    MaintenanceController.listPlans
);

// router.put(
//     "/plans/:id/cancel",
//     authenticate(),
//     authorize(ROLES.MANAGER),
//     MaintenanceController.cancelPlan
// );

// Repair routes
router.post(
    "/repairs",
    authenticate(),
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    validateCreateRepair,
    MaintenanceController.createRepairRequest
);

router.get(
    "/repairs/:id",
    authenticate(),
    MaintenanceController.getRepairRequestById
);

router.put(
    "/repairs/:id/approve",
    authenticate(),
    authorize(ROLES.MANAGER),
    validateApproveRepair,
    MaintenanceController.approveRepairRequest
);

// Adjust Plan routes
router.post(
    "/adjust-plans",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    validateCreateAdjustPlan,
    MaintenanceController.createAdjustPlanRequest
);

router.get(
    "/adjust-plans/:id",
    authenticate(),
    MaintenanceController.getAdjustPlanRequestById
);

router.put(
    "/adjust-plans/:id/approve",
    authenticate(),
    authorize(ROLES.MANAGER),
    validateApproveAdjustPlan,
    MaintenanceController.approveAdjustPlanRequest
);

// Damage Report routes
router.post(
    "/damage-reports",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    validateCreateDamageReport,
    MaintenanceController.createDamageReport
);

router.get(
    "/damage-reports/:id",
    authenticate(),
    MaintenanceController.getDamageReportById
);

// Maintenance Request routes
router.post(
    "/maintenance-requests",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    validateCreateMaintenanceRequest,
    MaintenanceController.createMaintenanceRequest
);

router.get(
    "/maintenance-requests/:id",
    authenticate(),
    MaintenanceController.getMaintenanceRequestById
);

router.put(
    "/maintenance-requests/:id/approve",
    authenticate(),
    authorize(ROLES.MANAGER),
    validateApproveMaintenanceRequest,
    MaintenanceController.approveMaintenanceRequest
);

// Acceptance Report routes
router.post(
    "/acceptance-reports",
    authenticate(),
    authorize(ROLES.TECHNICIAN),
    validateCreateAcceptanceReport,
    MaintenanceController.createAcceptanceReport
);

router.get(
    "/acceptance-reports/:id",
    authenticate(),
    MaintenanceController.getAcceptanceReportById
);

router.put(
    "/acceptance-reports/:id/approve",
    authenticate(),
    authorize(ROLES.MANAGER),
    validateApproveAcceptanceReport,
    MaintenanceController.approveAcceptanceReport
);

export default router;