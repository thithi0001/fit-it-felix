import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { unauthorized } from "../../../../shared/utils/errors.js";
import { blacklistToken as addToBlacklist, isTokenRevoked as checkTokenRevoked } from "../../../../shared/utils/tokenBlacklist.js";

const accessSecret = env.JWT_SECRET ?? "default_jwt_secret";
const refreshSecret = env.JWT_REFRESH_SECRET ?? "default_refresh_secret";

export const blacklistToken = (token) => addToBlacklist(token);

export const isTokenRevoked = (token) => checkTokenRevoked(token);

export const signAccessToken = (payload) =>
    jwt.sign(payload, accessSecret, { expiresIn: env.JWT_EXPIRES_IN ?? "15m" });

export const verifyAccessToken = (token) => {
    if (isTokenRevoked(token)) {
        throw unauthorized("Token revoked");
    }
    return jwt.verify(token, accessSecret);
};

export const signRefreshToken = (payload) =>
    jwt.sign(payload, refreshSecret, { expiresIn: "7d" });

export const verifyRefreshToken = (token) => {
    if (isTokenRevoked(token)) {
        throw unauthorized("Token revoked");
    }
    return jwt.verify(token, refreshSecret);
};

export const verifyToken = verifyAccessToken;
