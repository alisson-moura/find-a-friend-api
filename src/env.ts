import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  HTTP_PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(3),
  DATABASE_URL: z.string().url()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('⚠️ Environment variables missing');
  console.log(_env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
