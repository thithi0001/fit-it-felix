import { unauthorized } from "../utils/errors.js";
import { env } from "../config/index.js";

export const authenticateService = (req, res, next) => {
    const serviceKey = req.headers["x-service-key"];

    if (!env.INTERNAL_SERVICE_KEY || serviceKey !== env.INTERNAL_SERVICE_KEY) {
        return next(unauthorized("Invalid service credentials"));
    }

    next();
};