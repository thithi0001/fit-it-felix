import dotenv from "dotenv";
import path from "path";
import { env as rootEnv } from "../../../shared/config/env.js";

const serviceEnvPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: serviceEnvPath });

const loadEnv = {
  ...rootEnv,
  PORT: Number(process.env.PORT ?? rootEnv.GATEWAY_PORT ?? 3000),
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL ?? "http://localhost:3001",
  TEST: process.env.TEST ?? "cannot load env",
};

if (loadEnv.NODE_ENV) {
  console.log("[gateway-env] TEST:", loadEnv.TEST);
  console.log("[gateway-env] AUTH_SERVICE_URL:", loadEnv.AUTH_SERVICE_URL);
}

export const env = loadEnv;