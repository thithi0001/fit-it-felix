import prisma from "../config/prisma.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { badRequest, forbidden, unauthorized } from "../../../../shared/utils/errors.js";
import { parseSchema } from "../../../../shared/validations/parseSchema.validation.js";
import { toBigInt } from "../../../../shared/utils/response.js";
import { 
    createPlanSchema,
    updatePlanSchema,
    createRepairRequestSchema,
    approveRepairRequestSchema,
    createAdjustPlanRequestSchema,
    approveAdjustPlanRequestSchema,
    createDamageReportSchema,
    createMaintenanceRequestSchema,
    approveMaintenanceRequestSchema,
    createAcceptanceReportSchema,
    approveAcceptanceReportSchema
} from "../validations/maintenance.validation.js";

export const validateCreatePlan = (req, res, next) => {
    try {
        req.body = parseSchema(createPlanSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateUpdatePlan = (req, res, next) => {
    try {
        req.body = parseSchema(updatePlanSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateRepair = (req, res, next) => {
    try {
        req.body = parseSchema(createRepairRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateApproveRepair = (req, res, next) => {
    try {
        req.body = parseSchema(approveRepairRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateAdjustPlan = (req, res, next) => {
    try {
        req.body = parseSchema(createAdjustPlanRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateApproveAdjustPlan = (req, res, next) => {
    try {
        req.body = parseSchema(approveAdjustPlanRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateDamageReport = (req, res, next) => {
    try {
        req.body = parseSchema(createDamageReportSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateMaintenanceRequest = (req, res, next) => {
    try {
        req.body = parseSchema(createMaintenanceRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateApproveMaintenanceRequest = (req, res, next) => {
    try {
        req.body = parseSchema(approveMaintenanceRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateAcceptanceReport = (req, res, next) => {
    try {
        req.body = parseSchema(createAcceptanceReportSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateApproveAcceptanceReport = (req, res, next) => {
    try {
        req.body = parseSchema(approveAcceptanceReportSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};
