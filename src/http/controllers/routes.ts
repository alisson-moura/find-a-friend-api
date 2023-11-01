import { type FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';

export async function publicRoutes (app: FastifyInstance): Promise<void> {
  app.post('/orgs', registerOrg);
}
