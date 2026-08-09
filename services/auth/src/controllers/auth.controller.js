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

    refresh: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            const result = await AuthService.refreshToken(refreshToken);
            return res.json(successResponse({ data: result, message: "Token refreshed" }));
        } catch (error) {
            return next(error);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.replace("Bearer ", "") || req.body.token;
            const result = await AuthService.logout(token);
            return res.json(successResponse({ data: result, message: "Logged out successfully" }));
        } catch (error) {
            return next(error);
        }
    },

    me: async (req, res) => {
        return res.json(successResponse({ data: req.user, message: "User info" }));
    },
};
