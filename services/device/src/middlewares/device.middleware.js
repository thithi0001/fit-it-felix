import prisma from "../config/prisma.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { forbidden } from "../../../../shared/utils/errors.js";
import { toBigInt } from "../../../../shared/utils/response.js";
import { parseSchema } from "../../../../shared/validations/parseSchema.validation.js";
import {
    approveAssignRequestDetailSchema,
    createAssignRequestSchema,
    updateDeviceSchema
} from "../validations/device.validation.js";

export const validateCreateAssignRequest = (req, res, next) => {
    try {
        req.body = parseSchema(createAssignRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateApproveAssignRequest = (req, res, next) => {
    try {
        req.body = parseSchema(approveAssignRequestDetailSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateUpdateDevice = (req, res, next) => {
    try {
        req.body = parseSchema(updateDeviceSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const requireAssignRequestOwnership = (paramName = "employeeId") => async (req, res, next) => {
    try {
        const currentEmployeeId = req.user?.employee_id ? String(req.user.employee_id) : "";
        const currentRole = req.user?.role;

        if (!currentEmployeeId) {
            throw forbidden("User employee id is missing");
        }

        if ([ROLES.ADMIN, ROLES.MANAGER].includes(currentRole)) {
            return next();
        }

        const targetEmployeeId = req.params[paramName]
            ? String(req.params[paramName])
            : req.params.id
                ? String(req.params.id)
                : req.body?.created_by
                    ? String(req.body.created_by)
                    : "";

        if (targetEmployeeId && targetEmployeeId !== currentEmployeeId) {
            throw forbidden("You can only access your own assign requests");
        }

        if (req.params[paramName]) {
            return next();
        }

        const targetId = req.params.id;
        if (!targetId) {
            throw forbidden("Assign request id is required");
        }

        const assignRequest = await prisma.assign_requests.findUnique({
            where: { id: toBigInt(targetId) },
        });

        if (!assignRequest) {
            throw forbidden("Assign request not found");
        }

        if (String(assignRequest.created_by_employee_id) !== currentEmployeeId) {
            throw forbidden("You can only read your own assign requests");
        }

        req.assignRequest = assignRequest;
        next();
    } catch (error) {
        next(error);
    }
};
