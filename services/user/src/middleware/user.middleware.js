import { forbidden, unauthorized } from "../../../../shared/utils/errors.js";
import { authenticate as sharedAuthenticate, authorize as sharedAuthorize } from "../../../../shared/middlewares/auth.middleware.js";
import { UserRepository } from "../repositories/user.repository.js";

export const authenticate = (req, res, next) =>
    sharedAuthenticate(async (payload) => {
        const account = await UserRepository.findById(Number(payload.sub));
        if (!account) {
            throw unauthorized("User not found");
        }

        return {
            ...payload,
            id: String(account.id),
            employee_id: String(account.employee_id),
            role: account.roles?.code ?? payload.role,
        };
    })(req, res, next);

export const authorize = (...allowedRoles) => sharedAuthorize(...allowedRoles);

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
