// env.js
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..", "..");
const rootEnvPath = path.resolve(backendRoot, ".env");

dotenv.config({ path: rootEnvPath });

const loadedEnv = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  GATEWAY_PORT: Number(process.env.GATEWAY_PORT ?? 3000),
  AUTH_PORT: Number(process.env.AUTH_PORT ?? 3001),
  USER_PORT: Number(process.env.USER_PORT ?? 3002),
  DEVICE_PORT: Number(process.env.DEVICE_PORT ?? 3003),
  INVENTORY_PORT: Number(process.env.INVENTORY_PORT ?? 3004),
  MAINTENANCE_PORT: Number(process.env.MAINTENANCE_PORT ?? 3005),
  AI_PORT: Number(process.env.AI_PORT ?? 3006),
  AUDIT_PORT: Number(process.env.AUDIT_PORT ?? 3007),
  REPORT_PORT: Number(process.env.REPORT_PORT ?? 3008),
  RABBITMQ_URL: process.env.RABBITMQ_URL ?? "amqp://guest:guest@rabbitmq:5672",
  JWT_SECRET: process.env.JWT_SECRET ?? "jwt_secret_not_set",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "jwt_refresh_secret_not_set",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
};

if (loadedEnv.NODE_ENV) {
  console.log("[root-env] JWT_SECRET:", loadedEnv.JWT_SECRET);
  console.log("[root-env] JWT_REFRESH_SECRET:", loadedEnv.JWT_REFRESH_SECRET);
  console.log("[root-env] RABBITMQ_URL:", loadedEnv.RABBITMQ_URL);
}

export const env = loadedEnv;