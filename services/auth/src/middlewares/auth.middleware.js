import { loginSchema, refreshTokenSchema } from "../validations/auth.validation.js";
import { badRequest } from "../../../../shared/utils/errors.js";
import { AuthRepository } from "../repositories/auth.repository.js";
import { authenticate as sharedAuthenticate, authorize as sharedAuthorize } from "../../../../shared/middlewares/auth.middleware.js";

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

export const validateLogin = (req, res, next) => {
    try {
        req.body = parseSchema(loginSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const validateRefreshToken = (req, res, next) => {
    try {
        req.body = parseSchema(refreshTokenSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};

export const authenticate = sharedAuthenticate(async (payload) => {
    const account = await AuthRepository.findById(Number(payload.sub));
    if (!account) {
        throw new Error("Account not found");
    }

    return {
        id: String(account.id),
        employee_id: String(account.employee_id),
        username: account.username,
        email: account.email,
        status: account.status,
        role: account.roles?.code ?? null,
        employee: account.employees
            ? {
                  employee_code: account.employees.employee_code,
                  full_name: account.employees.full_name,
                  position: account.employees.position,
                  department: account.employees.departments?.name ?? null,
              }
            : null,
    };
});

export const authorize = (...allowedRoles) => sharedAuthorize(...allowedRoles);
