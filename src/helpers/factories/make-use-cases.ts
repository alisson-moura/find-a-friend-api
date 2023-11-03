import { AuthOrgUseCase } from '../../app/use-cases/auth-org';
import { FetchPetsByCityUseCase } from '../../app/use-cases/fetch-pets-by-city';
import { GetPetUseCase } from '../../app/use-cases/get-pet';
import { RegisterOrgUseCase } from '../../app/use-cases/register-org';
import { RegisterPetUseCase } from '../../app/use-cases/register-pet';
import { PrismaOrgRepository } from '../../database/repositories/prisma-org-repository';
import { PrismaPetRepository } from '../../database/repositories/prisma-pet-repository';

const prismaOrgRepository = new PrismaOrgRepository();
const prismaPetRepository = new PrismaPetRepository();

export function makeRegisterOrgUseCase (): RegisterOrgUseCase {
  return new RegisterOrgUseCase(prismaOrgRepository);
}

export function makeAuthOrgUseCase (): AuthOrgUseCase {
  return new AuthOrgUseCase(prismaOrgRepository);
}

export function makeRegisterPetUseCase (): RegisterPetUseCase {
  return new RegisterPetUseCase(prismaOrgRepository, prismaPetRepository);
}

export function makeGetPetUseCase (): GetPetUseCase {
  return new GetPetUseCase(prismaPetRepository);
}

export function makeFetchPetsByCity (): FetchPetsByCityUseCase {
  return new FetchPetsByCityUseCase(prismaPetRepository);
}
