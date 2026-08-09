import { env } from "../config/index.js";
import { errorResponse } from "../utils/response.js";

const mapAuthMessage = (message) => {
    if (message === "Token revoked") {
        return "Session expired. Please login again.";
    }

    if (message === "Missing or invalid token") {
        return "Authentication required.";
    }

    if (message === "Account not found") {
        return "User account no longer exists.";
    }

    return message;
};

export const errorMiddleware = (err, req, res, next) => {
    const status = err.status ?? 500;
    const message = mapAuthMessage(err.message ?? "Internal Server Error");

    const response = errorResponse({
        message,
        errors: err.errors ?? null,
    });

    if (env.NODE_ENV !== "production") {
        response.stack = err.stack;
    }

    return res.status(status).json(response);
};