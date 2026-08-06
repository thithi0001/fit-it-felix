import { errorResponse } from "../utils/response.js";

export const errorMiddleware = (err, req, res, next) => {
    const status = err.status ?? 500;
    const response = errorResponse({ message: err.message ?? "Internal Server Error", errors: err.errors ?? null });
    return res.status(status).json(response);
};
