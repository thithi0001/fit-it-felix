import { badRequest, forbidden, unauthorized } from "../../../../shared/utils/errors.js";
import { authenticate as sharedAuthenticate, authorize as sharedAuthorize } from "../../../../shared/middlewares/auth.middleware.js";
import { InventoryRepository } from '../repositories/inventory.repository.js';
import { approveItemRequestSchema, createItemRequestSchema } from "../validations/inventory.validation.js";
import { parseSchema } from "../../../../shared/validations/parseSchema.validation.js";

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