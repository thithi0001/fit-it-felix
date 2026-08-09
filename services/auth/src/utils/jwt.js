import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const accessSecret = env.JWT_SECRET ?? "default_jwt_secret";
const refreshSecret = env.JWT_REFRESH_SECRET ?? "default_refresh_secret";
const revokedTokens = new Set();

export const blacklistToken = (token) => {
    revokedTokens.add(token);
};

export const isTokenRevoked = (token) => revokedTokens.has(token);

export const signAccessToken = (payload) =>
    jwt.sign(payload, accessSecret, { expiresIn: env.JWT_EXPIRES_IN ?? "15m" });

export const verifyAccessToken = (token) => {
    if (isTokenRevoked(token)) {
        throw new Error("Token revoked");
    }
    return jwt.verify(token, accessSecret);
};

export const signRefreshToken = (payload) =>
    jwt.sign(payload, refreshSecret, { expiresIn: "7d" });

export const verifyRefreshToken = (token) => jwt.verify(token, refreshSecret);

export const verifyToken = verifyAccessToken;
