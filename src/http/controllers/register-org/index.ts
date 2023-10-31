import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type Org } from '../../../entities/Org';
import { RegisterOrgUseCase } from '../../../use-cases/register-org';
import { type OrgRepository } from '../../../repositories/org-repository';
import { registerOrgBodySchema } from './register-org-schema';

export async function registerOrg (
  request: FastifyRequest, reply: FastifyReply
): Promise<FastifyReply> {
  const body = registerOrgBodySchema.parse(request.body);
  const useCase = new RegisterOrgUseCase(new OrgRepositoryFake());
  await useCase.execute(body);
  return await reply.status(200).send();
}

class OrgRepositoryFake implements OrgRepository {
  findById: (orgId: string) => Promise<Org | null>;
  async findByEmail (orgEmail: string): Promise<Org | null> {
    return null;
  }

  async create (org: Org): Promise<Org> {
    return org;
  }
}
