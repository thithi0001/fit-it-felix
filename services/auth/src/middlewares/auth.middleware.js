import { loginSchema, refreshTokenSchema } from "../validations/auth.validation.js";
import { badRequest, forbidden, unauthorized } from "../../../../shared/utils/errors.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { AuthRepository } from "../repositories/auth.repository.js";

const parseSchema = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.errors.map((issue) => ({ field: issue.path.join("."), message: issue.message }));
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

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw unauthorized("Missing or invalid token");
        }

        const token = authHeader.split(" ")[1];
        const payload = verifyAccessToken(token);
        const account = await AuthRepository.findById(Number(payload.sub));
        if (!account) {
            throw unauthorized("Account not found");
        }

        req.user = {
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
        next();
    } catch (error) {
        next(error);
    }
};

export const authorize = (...allowedRoles) => (req, res, next) => {
    try {
        const userRole = req.user?.role;
        if (!userRole) {
            throw forbidden("No role assigned to user");
        }

        if (!allowedRoles.includes(userRole)) {
            throw forbidden("You do not have permission to access this resource");
        }

        next();
    } catch (error) {
        next(error);
    }
};
