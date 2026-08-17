import { badRequest, forbidden, unauthorized } from "../../../../shared/utils/errors.js";
import { authenticate as sharedAuthenticate, authorize as sharedAuthorize } from "../../../../shared/middlewares/auth.middleware.js";
import { UserRepository } from "../repositories/user.repository.js";
import { updateEmployeeSchema, createEmployeeSchema } from "../validations/user.validation.js";

const parseSchema = (schema, data) => {
    const input = data ?? {};
    const result = schema.safeParse(input);

    if (!result.success) {
        const issues = result.error?.issues ?? result.error?.errors ?? [];
        const errors = issues.map((issue) => ({
            field: issue.path?.join(".") ?? "body",
            message: issue.message,
        }));

        throw badRequest("Validation failed", errors);
    }

    return result.data;
};

export const authenticate = (req, res, next) =>
    sharedAuthenticate(async (payload) => {
        const employee = await UserRepository.getById(Number(payload.employee_id));
        if (!employee) {
            throw unauthorized("User not found");
        }

        return {
            ...payload,
            id: String(employee.id),
            employee_id: String(employee.id),
            role: employee.roles?.code ?? payload.role,
        };
    })(req, res, next);

export const authorize = (...allowedRoles) => sharedAuthorize(...allowedRoles);

export const validateUpdateEmployee = (req, res, next) => {
    try {
        req.body = parseSchema(updateEmployeeSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateEmployee = (req, res, next) => {
    try {
        req.body = parseSchema(createEmployeeSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const requireEmployeeOwnership = (paramName = "id") => (req, res, next) => {
    try {
        const targetEmployeeId = String(req.params[paramName] ?? req.body?.employee_id ?? "");
        const currentEmployeeId = req.user?.employee_id ? String(req.user.employee_id) : "";

        if (!targetEmployeeId) {
            throw forbidden("Employee id is required");
        }

        if (currentEmployeeId === targetEmployeeId) {
            return next();
        }

        throw forbidden("You can only modify your own employee data");
    } catch (error) {
        next(error);
    }
};
