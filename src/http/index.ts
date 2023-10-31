import Fastify from 'fastify';
import { publicRoutes } from './controllers/routes';

const app = Fastify({
  logger: true
});

void app.register(publicRoutes);

export default app;
