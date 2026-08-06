import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const secret = env.JWT_SECRET || "default_jwt_secret";

export const signAccessToken = (payload) =>
    jwt.sign(payload, secret, { expiresIn: env.JWT_EXPIRES_IN || "7d" });

export const verifyToken = (token) => jwt.verify(token, secret);
