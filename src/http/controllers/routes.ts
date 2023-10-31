import { type FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';
import { registerOrgSchema } from './register-org/register-org-schema';

export async function publicRoutes (app: FastifyInstance): Promise<void> {
  app.post('/orgs', { schema: registerOrgSchema }, registerOrg);
}
