import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type Org } from '../../../app/entities/Org';
import { RegisterOrgUseCase } from '../../../app/use-cases/register-org';
import { type OrgRepository } from '../../../app/repositories/org-repository';
import { z } from 'zod';
import { EmailAlreadyInUse } from '../../../app/use-cases/errors/email-already-use';

export async function registerOrg (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
  const body = requestBodyRegisterOrgSechema.parse(req.body);
  const useCase = new RegisterOrgUseCase(new OrgRepositoryFake());
  try {
    await useCase.execute(body);
  } catch (error) {
    if (error instanceof EmailAlreadyInUse) {
      return await res.status(409).send({ message: error.message });
    }
    throw error;
  }
  return await res.status(201).send();
}

export const requestBodyRegisterOrgSechema = z.object({
  name: z.string().min(3),
  owner: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().length(11),
  address: z.object({
    city: z.string().min(3),
    state: z.string().length(2).toUpperCase(),
    cep: z.string().min(9, 'Por favor informe um CEP válido (00000-000)'),
    number: z.coerce.number().min(1, 'Por favor informe um número válido'),
    street: z.string().min(1, 'Por favor ruma rua válida')
  })
});

class OrgRepositoryFake implements OrgRepository {
  async findById (orgId: string): Promise<Org | null> {
    return null;
  }

  async findByEmail (orgEmail: string): Promise<Org | null> {
    return null;
  }

  async create (org: Org): Promise<Org> {
    return org;
  }
}
