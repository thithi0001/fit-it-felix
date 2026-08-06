// env.js
import dotenv from "dotenv";
import path from "path";
import { env as rootEnv } from "../../../../shared/config/env.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const env = {
  ...rootEnv,
  PORT: Number(process.env.PORT ?? rootEnv.AUTH_PORT ?? 3001),
};