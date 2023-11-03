import { type FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';
import { authOrgController } from './auth-org';
import { auth } from '../middleware/auth';
import { registerPetController } from './register-pet';
import { getPetController } from './get-pet';
import { fetchPetsByCityController } from './fetch-pets-by-city';

export async function publicRoutes (app: FastifyInstance): Promise<void> {
  app.post('/orgs', registerOrg);
  app.post('/sessions', authOrgController);
  app.get('/pets/:petId', getPetController);
  app.get('/pets/city/:city', fetchPetsByCityController);
}

export async function privateRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', auth);
  app.post('/pets', registerPetController);
}
