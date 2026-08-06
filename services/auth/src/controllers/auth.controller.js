import { AuthService } from "../services/auth.service.js";
import { successResponse } from "../../../../shared/utils/response.js";

export const AuthController = {
    health: (req, res) => res.json({ status: "OK" }),

    login: async (req, res, next) => {
        try {
            const result = await AuthService.login(req.body);
            return res.json(successResponse({ data: result, message: "Login successful" }));
        } catch (error) {
            return next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            const result = await AuthService.register(req.body);
            return res.status(201).json(successResponse({ data: result, message: "Registration successful" }));
        } catch (error) {
            return next(error);
        }
    },
};
