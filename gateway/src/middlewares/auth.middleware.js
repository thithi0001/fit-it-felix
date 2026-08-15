import { authenticate, authorize } from "../../../shared/middlewares/auth.middleware.js";

export const authenticateGateway = (req, res, next) => {
    return authenticate()(req, res, next);
};

export const authorizeGateway = (...allowedRoles) => (req, res, next) => {
    return authorize(...allowedRoles)(req, res, next);
};
