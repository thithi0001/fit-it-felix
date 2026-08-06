export class AppError extends Error {
    constructor(message, status = 500, errors = null, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.errors = errors;
        this.isOperational = isOperational;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const badRequest = (message = "Bad Request", errors = null) =>
    new AppError(message, 400, errors);

export const unauthorized = (message = "Unauthorized") =>
    new AppError(message, 401);

export const forbidden = (message = "Forbidden") =>
    new AppError(message, 403);

export const notFound = (message = "Resource not found") =>
    new AppError(message, 404);

export const conflict = (message = "Conflict") =>
    new AppError(message, 409);

export const internalServerError = (message = "Internal Server Error") =>
    new AppError(message, 500);

export const isAppError = (error) => error instanceof AppError || (error?.isOperational === true);
