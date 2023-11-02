import { type FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';
import { authOrgController } from './auth-org';
import { auth } from '../middleware/auth';
import { registerPetController } from './register-pet';
import { getPetController } from './get-pet';

export async function publicRoutes (app: FastifyInstance): Promise<void> {
  app.post('/orgs', registerOrg);
  app.post('/sessions', authOrgController);
  app.get('/pets/:petId', getPetController);
}

export async function privateRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', auth);
  app.post('/pets', registerPetController);
}
