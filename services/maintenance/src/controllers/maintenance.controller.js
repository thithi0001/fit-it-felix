import { MaintenanceService } from '../services/maintenance.service.js';
import { successResponse } from "../../../../shared/utils/response.js";

export const MaintenanceController = {
    health: async (req, res) => res.json({status: 'ok'}),

    // Plan methods
    createPlan: async (req, res, next) => {
        try {
            const data = {
                ...req.body,
                created_by: req.user?.employee_id ?? req.body.created_by,
            };
            const plan = await MaintenanceService.createPlan(data);
            return res.json(successResponse({ data: plan, message: "Maintenance plan created" }));
        } catch (error) {
            next(error);
        }
    },

    getPlanById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const plan = await MaintenanceService.getPlanById(id);
            return res.json(successResponse({ data: plan, message: "Maintenance plan found" }));
        } catch (error) {
            next(error);
        }
    },

    updatePlan: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const plan = await MaintenanceService.updatePlan(id, data);
            return res.json(successResponse({ data: plan, message: "Maintenance plan updated" }));
        } catch (error) {
            next(error);
        }
    },

    listPlans: async (req, res, next) => {
        try {
            const plans = await MaintenanceService.listPlans();
            return res.json(successResponse({ data: plans, message: "Maintenance plans list" }));
        } catch (error) {
            next(error);
        }
    },

    listPlansByStatus: async (req, res, next) => {
        try {
            const { status } = req.params;
            const plans = await MaintenanceService.listPlansByStatus(status);
            return res.json(successResponse({ data: plans, message: "Maintenance plans by status" }));
        } catch (error) {
            next(error);
        }
    },

    getPlansByAssignment: async (req, res, next) => {
        try {
            const { employeeId } = req.params;
            const plans = await MaintenanceService.getPlansByAssignment(employeeId);
            return res.json(successResponse({ data: plans, message: "Plans assigned to employee" }));
        } catch (error) {
            next(error);
        }
    },

    startPlan: async (req, res, next) => {
        try {
            const { id } = req.params;
            const plan = await MaintenanceService.startPlan(id);
            return res.json(successResponse({ data: plan, message: "Maintenance plan started" }));
        } catch (error) {
            next(error);
        }
    },

    cancelPlan: async (req, res, next) => {
        try {
            const { id } = req.params;
            const plan = await MaintenanceService.cancelPlan(id);
            return res.json(successResponse({ data: plan, message: "Maintenance plan cancelled" }));
        } catch (error) {
            next(error);
        }
    },

    completePlan: async (req, res, next) => {
        try {
            const { id } = req.params;
            const plan = await MaintenanceService.completePlan(id);
            return res.json(successResponse({ data: plan, message: "Maintenance plan completed" }));
        } catch (error) {
            next(error);
        }
    },

    listAllPlanDocuments: async (req, res, next) => {
        try {
            const { planId } = req.params;
            const documents = await MaintenanceService.listAllPlanDocuments(planId);
            return res.json(successResponse({ data: documents, message: "Plan documents" }));
        } catch (error) {
            next(error);
        }
    },

    // Repair Request methods
    createRepairRequest: async (req, res, next) => {
        try {
            const data = req.body;
            const repair = await MaintenanceService.createRepairRequest(data);
            return res.json(successResponse({ data: repair, message: "Repair request created" }));
        } catch (error) {
            next(error);
        }
    },

    getRepairRequestById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const repair = await MaintenanceService.getRepairRequestById(id);
            return res.json(successResponse({ data: repair, message: "Repair request found" }));
        } catch (error) {
            next(error);
        }
    },

    approveRepairRequest: async (req, res, next) => {
        try {
            const { id } = req.params;
            const repair = await MaintenanceService.approveRepairRequest(id, req.body);
            return res.json(successResponse({ data: repair, message: "Repair request approved" }));
        } catch (error) {
            next(error);
        }
    },

    // Adjust Plan Request methods
    createAdjustPlanRequest: async (req, res, next) => {
        try {
            const data = req.body;
            const adjust = await MaintenanceService.createAdjustPlanRequest(data);
            return res.json(successResponse({ data: adjust, message: "Adjust plan request created" }));
        } catch (error) {
            next(error);
        }
    },

    getAdjustPlanRequestById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const adjust = await MaintenanceService.getAdjustPlanRequestById(id);
            return res.json(successResponse({ data: adjust, message: "Adjust plan request found" }));
        } catch (error) {
            next(error);
        }
    },

    approveAdjustPlanRequest: async (req, res, next) => {
        try {
            const { id } = req.params;
            const adjust = await MaintenanceService.approveAdjustPlanRequest(id, req.body);
            return res.json(successResponse({ data: adjust, message: "Adjust plan request approved" }));
        } catch (error) {
            next(error);
        }
    },

    // Damage Report methods
    createDamageReport: async (req, res, next) => {
        try {
            const data = req.body;
            const damage = await MaintenanceService.createDamageReport(data);
            return res.json(successResponse({ data: damage, message: "Damage report created" }));
        } catch (error) {
            next(error);
        }
    },

    getDamageReportById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const damage = await MaintenanceService.getDamageReportById(id);
            return res.json(successResponse({ data: damage, message: "Damage report found" }));
        } catch (error) {
            next(error);
        }
    },

    // Maintenance Request methods
    createMaintenanceRequest: async (req, res, next) => {
        try {
            const data = req.body;
            const maintenance = await MaintenanceService.createMaintenanceRequest(data);
            return res.json(successResponse({ data: maintenance, message: "Maintenance request created" }));
        } catch (error) {
            next(error);
        }
    },

    getMaintenanceRequestById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const maintenance = await MaintenanceService.getMaintenanceRequestById(id);
            return res.json(successResponse({ data: maintenance, message: "Maintenance request found" }));
        } catch (error) {
            next(error);
        }
    },

    approveMaintenanceRequest: async (req, res, next) => {
        try {
            const { id } = req.params;
            const maintenance = await MaintenanceService.approveMaintenanceRequest(id, req.body);
            return res.json(successResponse({ data: maintenance, message: "Maintenance request approved" }));
        } catch (error) {
            next(error);
        }
    },

    // Acceptance Report methods
    createAcceptanceReport: async (req, res, next) => {
        try {
            const data = req.body;
            const acceptance = await MaintenanceService.createAcceptanceReport(data);
            return res.json(successResponse({ data: acceptance, message: "Acceptance report created" }));
        } catch (error) {
            next(error);
        }
    },

    getAcceptanceReportById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const acceptance = await MaintenanceService.getAcceptanceReportById(id);
            return res.json(successResponse({ data: acceptance, message: "Acceptance report found" }));
        } catch (error) {
            next(error);
        }
    },

    approveAcceptanceReport: async (req, res, next) => {
        try {
            const { id } = req.params;
            const acceptance = await MaintenanceService.approveAcceptanceReport(id, req.body);
            return res.json(successResponse({ data: acceptance, message: "Acceptance report approved" }));
        } catch (error) {
            next(error);
        }
    },

    listRepairRequests: async (req, res, next) => {
        try {
            const repairs = await MaintenanceService.listRepairRequests();
            return res.json(successResponse({ data: repairs, message: "Repair requests list" }));
        } catch (error) {
            next(error);
        }
    },

    listAcceptanceReports: async (req, res, next) => {
        try {
            const reports = await MaintenanceService.listAcceptanceReports();
            return res.json(successResponse({ data: reports, message: "Acceptance reports list" }));
        } catch (error) {
            next(error);
        }
    },

    listAdjustPlanRequests: async (req, res, next) => {
        try {
            const adjusts = await MaintenanceService.listAdjustPlanRequests();
            return res.json(successResponse({ data: adjusts, message: "Adjust plan requests list" }));
        } catch (error) {
            next(error);
        }
    },
}