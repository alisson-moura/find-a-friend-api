import { type FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';
import { authOrgController } from './auth-org';
import { auth } from '../middleware/auth';
import { registerPetController } from './register-pet';

export async function publicRoutes (app: FastifyInstance): Promise<void> {
  app.post('/orgs', registerOrg);
  app.post('/sessions', authOrgController);
}

export async function privateRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', auth);
  app.post('/pets', registerPetController);
}
