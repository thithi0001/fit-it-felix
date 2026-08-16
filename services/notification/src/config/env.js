import dotenv from 'dotenv';
import path from 'path';
import { env as rootEnv } from '../../../../shared/config/env.js';

const serviceEnvPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: serviceEnvPath });

const loadEnv = {
  ...rootEnv,
  PORT: Number(process.env.PORT ?? rootEnv.NOTIFICATION_PORT ?? 3009),
  TEST: process.env.TEST ?? 'cannot load env',
  DATABASE_URL: process.env.DATABASE_URL ?? '',
};

if (loadEnv.NODE_ENV) {
  console.log('[notification-env] TEST:', loadEnv.TEST);
  console.log('[notification-env] DATABASE_URL:', loadEnv.DATABASE_URL ? 'loaded' : 'missing');
}

export const env = loadEnv;