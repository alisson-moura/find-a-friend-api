import { type FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';
import { registerOrgSchema } from './register-org/register-org-schema';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';

export async function publicRoutes (app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().post('/orgs', { schema: registerOrgSchema }, registerOrg);
}
