import 'dotenv/config';
import { z } from 'zod';
import app from './http';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  HTTP_PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(3),
  DATABASE_URL: z.string().url()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  app.log.error('⚠️ Environment variables missing');
  app.log.error(_env.error.format());
  process.exit(1);
}

export const env = _env.data;
