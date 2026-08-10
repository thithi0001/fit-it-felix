import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { forbidden, unauthorized } from "../utils/errors.js";

export const authenticate = (getUserFromToken = null) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw unauthorized("Missing or invalid token");
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, env.JWT_SECRET);

        let user = payload;
        if (getUserFromToken) {
            user = await getUserFromToken(payload, req);
        }

        req.user = user;
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
