import { AuthRepository } from "../repositories/auth.repository.js";
import { signAccessToken } from "../utils/jwt.js";
import { conflict, unauthorized } from "../../../../shared/utils/errors.js";

export const AuthService = {
    login: async ({ email, password }) => {
        const user = await AuthRepository.findByEmail(email);
        if (!user) {
            throw unauthorized("Invalid email or password");
        }

        const isMatch = await AuthRepository.comparePassword(password, user.password);
        if (!isMatch) {
            throw unauthorized("Invalid email or password");
        }

        const token = signAccessToken({ sub: user.id, email: user.email });
        return {
            user: { id: user.id, name: user.name, email: user.email },
            accessToken: token,
        };
    },

    register: async ({ name, email, password }) => {
        const existing = await AuthRepository.findByEmail(email);
        if (existing) {
            throw conflict("Email is already registered");
        }

        const user = await AuthRepository.createUser({ name, email, password });
        const token = signAccessToken({ sub: user.id, email: user.email });
        return {
            user: { id: user.id, name: user.name, email: user.email },
            accessToken: token,
        };
    },
};