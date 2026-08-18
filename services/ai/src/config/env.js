import dotenv from "dotenv";
import path from "path";
import { env as rootEnv } from "../../../../shared/config/env.js";

const serviceEnvPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: serviceEnvPath });

const loadEnv = {
    ...rootEnv,
    PORT: Number(process.env.PORT ?? rootEnv.AI_PORT ?? 3006),
    TEST: process.env.TEST ?? "cannot load env",
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",
    GEMINI_MODEL: process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite",
};

if (loadEnv.NODE_ENV) {
    console.log("[ai-env] TEST:", loadEnv.TEST);
    console.log("[ai-env] DATABASE_URL:", loadEnv.DATABASE_URL ? "loaded" : "missing");
    console.log("[ai-env] GEMINI_API_KEY:", loadEnv.GEMINI_API_KEY ? "loaded" : "missing");
}

export const env = loadEnv;
