import { AuthRepository } from "../repositories/auth.repository.js";
import { blacklistToken, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { badRequest, unauthorized } from "../../../../shared/utils/errors.js";
import { publish } from "../../../../shared/rabbitmq/index.js";
import { EVENTS, EXCHANGES } from "../../../../shared/constants/index.js";

const buildUserPayload = (account) => {
    const employee = account.employees ?? null;
    const department = employee?.departments ?? null;

    return {
        id: String(account.id),
        employee_id: String(account.employee_id),
        username: account.username,
        email: account.email,
        status: account.status,
        role: account.roles?.code ?? null,
        employee: employee
            ? {
                  employee_code: employee.employee_code,
                  full_name: employee.full_name,
                  position: employee.position,
                  department: department?.name ?? null,
              }
            : null,
    };
};

export const AuthService = {
    login: async ({ username, password }) => {
        const account = await AuthRepository.findByUsername(username);
        if (!account) {
            throw unauthorized("Invalid username or password");
        }

        const isMatch = await AuthRepository.comparePassword(password, account.password_hash);
        if (!isMatch) {
            throw unauthorized("Invalid username or password");
        }

        const accessToken = signAccessToken({
            sub: String(account.id),
            employee_id: String(account.employee_id),
            username: account.username,
            email: account.email,
            role: account.roles?.code,
        });

        const refreshToken = signRefreshToken({
            sub: String(account.id),
            username: account.username,
        });

        await publish(EXCHANGES.USER, EVENTS.USER_LOGIN, {
            type: EVENTS.USER_LOGIN,
            data: {
                id: String(account.id),
                username: account.username,
                email: account.email,
                role: account.roles?.code ?? null,
            },
        });

        return {
            user: buildUserPayload(account),
            accessToken,
            refreshToken,
        };
    },

    refreshToken: async (token) => {
        try {
            const payload = verifyRefreshToken(token);
            const account = await AuthRepository.findById(Number(payload.sub));
            if (!account) {
                throw unauthorized("Invalid refresh token");
            }

            const accessToken = signAccessToken({
                sub: String(account.id),
                employee_id: String(account.employee_id),
                username: account.username,
                email: account.email,
                role: account.roles?.code,
            });

            return { accessToken };
        } catch (error) {
            throw badRequest("Invalid or expired refresh token");
        }
    },

    logout: async (token, refreshToken) => {
        if (!token) {
            throw badRequest("Token is required");
        }

        blacklistToken(token);
        if (refreshToken) {
            blacklistToken(refreshToken);
        }
        return { success: true, message: "Logged out successfully" };
    },
};