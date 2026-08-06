import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { badRequest } from "../../../shared/utils/errors.js";

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

export const validateRegister = (req, res, next) => {
    try {
        req.body = parseSchema(registerSchema, req.body);
        next();
    } catch (error) {
        next(error);
    }
};
