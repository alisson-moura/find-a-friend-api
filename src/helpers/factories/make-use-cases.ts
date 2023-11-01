import { RegisterOrgUseCase } from '../../app/use-cases/register-org';
import { PrismaOrgRepository } from '../../database/repositories/prisma-org-repository';

const prismaOrgRepository = new PrismaOrgRepository();

export function makeRegisterOrgUseCase (): RegisterOrgUseCase {
  return new RegisterOrgUseCase(prismaOrgRepository);
}
