import dotenv from "dotenv";
import path from "path";
import { env as rootEnv } from "../../../shared/config/env.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const loadEnv = {
  ...rootEnv,
  PORT: Number(process.env.PORT ?? rootEnv.GATEWAY_PORT ?? 3000),
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  TEST: process.env.TEST ?? "cannot load env",
};

if (process.env.NODE_ENV !== "production") {
  // console.log(`[env] Loaded from ${path.resolve(process.cwd(), ".env")}`);
  // console.log("[env] Loaded:", loadEnv);
  console.log("[env] TEST:", loadEnv.TEST);
  console.log("[env] AUTH_SERVICE_URL:", loadEnv.AUTH_SERVICE_URL);
}

export const env = loadEnv;