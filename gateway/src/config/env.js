import dotenv from "dotenv";
import path from "path";
import { env as rootEnv } from "../../../shared/config/env.js";

const serviceEnvPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: serviceEnvPath });

const loadEnv = {
  ...rootEnv,
  PORT: Number(process.env.PORT ?? rootEnv.GATEWAY_PORT ?? 3000),
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL ?? "http://localhost:3001",
  USER_SERVICE_URL: process.env.USER_SERVICE_URL ?? "http://localhost:3002",
  DEVICE_SERVICE_URL: process.env.DEVICE_SERVICE_URL ?? "http://localhost:3003",
  INVENTORY_SERVICE_URL: process.env.INVENTORY_SERVICE_URL ?? "http://localhost:3004",
  MAINTENANCE_SERVICE_URL: process.env.MAINTENANCE_SERVICE_URL ?? "http://localhost:3005",
  AI_SERVICE_URL: process.env.AI_SERVICE_URL ?? "http://localhost:3006",
  AUDIT_SERVICE_URL: process.env.AUDIT_SERVICE_URL ?? "http://localhost:3007",
  REPORT_SERVICE_URL: process.env.REPORT_SERVICE_URL ?? "http://localhost:3008",
  NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL ?? "http://localhost:3009",
  TEST: process.env.TEST ?? "cannot load env",
};

if (loadEnv.NODE_ENV) {
  console.log("[gateway-env] TEST:", loadEnv.TEST);
  console.log("[gateway-env] AUTH_SERVICE_URL:", loadEnv.AUTH_SERVICE_URL);
  console.log("[gateway-env] USER_SERVICE_URL:", loadEnv.USER_SERVICE_URL);
  console.log("[gateway-env] DEVICE_SERVICE_URL:", loadEnv.DEVICE_SERVICE_URL);
  console.log("[gateway-env] INVENTORY_SERVICE_URL:", loadEnv.INVENTORY_SERVICE_URL);
  console.log("[gateway-env] MAINTENANCE_SERVICE_URL:", loadEnv.MAINTENANCE_SERVICE_URL);
  console.log("[gateway-env] AI_SERVICE_URL:", loadEnv.AI_SERVICE_URL);
  console.log("[gateway-env] AUDIT_SERVICE_URL:", loadEnv.AUDIT_SERVICE_URL);
  console.log("[gateway-env] REPORT_SERVICE_URL:", loadEnv.REPORT_SERVICE_URL);
}

export const env = loadEnv;