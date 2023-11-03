import { type FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';
import { authOrgController } from './auth-org';
import { auth } from '../middleware/auth';
import { registerPetController } from './register-pet';
import { getPetController } from './get-pet';
import { fetchPetsByCityController } from './fetch-pets-by-city';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { registerOrgSchema } from './register-org/schema';

export async function publicRoutes (app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().post('/orgs', {
    schema: registerOrgSchema
  }, registerOrg);

  app.post('/sessions', authOrgController);
  app.get('/pets/:petId', getPetController);
  app.get('/pets/city/:city', fetchPetsByCityController);
}

export async function privateRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', auth);
  app.post('/pets', registerPetController);
}
