// env.js
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..", "..");

dotenv.config({ path: path.resolve(backendRoot, ".env") });

const loadedEnv = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  GATEWAY_PORT: Number(process.env.GATEWAY_PORT ?? 3000),
  AUTH_PORT: Number(process.env.AUTH_PORT ?? 3001),
  USER_PORT: Number(process.env.USER_PORT ?? 3002),
  DEVICE_PORT: Number(process.env.DEVICE_PORT ?? 3003),
  INVENTORY_PORT: Number(process.env.INVENTORY_PORT ?? 3004),
  MAINTENANCE_PORT: Number(process.env.MAINTENANCE_PORT ?? 3005),
  RABBITMQ_URL: process.env.RABBITMQ_URL ?? "amqp://guest:guest@localhost:5672",
  JWT_SECRET: process.env.JWT_SECRET ?? "jwt_secret_not_set",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
};

if (process.env.NODE_ENV !== "production") {
  // console.log(`[env] Loaded from ${path.resolve(backendRoot, ".env")}`);
  // console.log("[env] Loaded:", loadedEnv);
  console.log("[env] JWT_SECRET:", loadedEnv.JWT_SECRET);
}

export const env = loadedEnv;