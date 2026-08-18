import prisma from "../config/prisma.js";
import { ROLES } from "../../../../shared/constants/roles.js";
import { badRequest, forbidden, unauthorized } from "../../../../shared/utils/errors.js";
import { authenticate as sharedAuthenticate, authorize as sharedAuthorize } from "../../../../shared/middlewares/auth.middleware.js";
import { InventoryRepository } from '../repositories/inventory.repository.js';
import { approveItemRequestSchema, createItemRequestSchema } from "../validations/inventory.validation.js";
import { parseSchema } from "../../../../shared/validations/parseSchema.validation.js";
import { toBigInt } from "../../../../shared/utils/response.js";

export const validateApproveItemRequest = (req, res, next) => {
    try {
        req.body = parseSchema(approveItemRequestSchema, req.body);
        next()
    } catch (error) {
        next(error);
    }
};

export const validateCreateItemRequest = (req, res, next) => {
    try {
        req.body = parseSchema(createItemRequestSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const requireItemRequestOwnership = async (req, res, next) => {
    try {
        const currentEmployeeId = req.user?.employee_id ? String(req.user.employee_id) : "";
        const currentRole = req.user?.role;

        if (!currentEmployeeId) {
            throw forbidden("User employee id is missing");
        }

        if ([ROLES.ADMIN, ROLES.MANAGER].includes(currentRole)) {
            return next();
        }

        const targetId = req.params.id;
        if (!targetId) {
            throw forbidden("Item request id is required");
        }

        const itemRequest = await prisma.item_requests.findUnique({
            where: { id: toBigInt(targetId) }
        });

        if (!itemRequest) {
            throw forbidden("Item request not found");
        }

        if (String(itemRequest.created_by_employee_id) !== currentEmployeeId) {
            throw forbidden("You can only read your own item requests");
        }

        req.itemRequest = itemRequest;
        next();
    } catch (error) {
        next(error);
    }
};