import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import { privateRoutes, publicRoutes } from './controllers/routes';
import { env } from '../env';

const app = Fastify({
  logger: true
});

void app.register(jwt, { secret: env.JWT_SECRET });
void app.register(publicRoutes);
void app.register(privateRoutes);

export default app;
