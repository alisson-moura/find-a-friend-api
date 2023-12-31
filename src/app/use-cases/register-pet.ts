import { Pet, type PetInfos } from '../../app/entities/Pet';
import { type SearchOrgByIdRepository } from '../../app/repositories/org-repository';
import { type CreatePetRepository } from '../../app/repositories/pet-repository';
import { ResourceNotFound } from './errors/resource-not-found';

interface Request {
  orgId: string
  name: string
  bio: string
  energyLevel: number
  independenceLevel: number
  photos: string[]
  requirements: string[]
  animal: {
    dateOfBirth: Date
    size: number
    type: string
  }
}

interface Response {
  pet: PetInfos
}

export class RegisterPetUseCase {
  constructor (
    private readonly orgRepository: SearchOrgByIdRepository,
    private readonly petRepository: CreatePetRepository
  ) { }

  async execute (props: Request): Promise<Response> {
    const org = await this.orgRepository.findById(props.orgId);
    if (org == null) {
      throw new ResourceNotFound('org');
    }
    const pet = new Pet({
      ...props,
      org,
      dateOfAdoption: null
    });

    await this.petRepository.create(pet, props.orgId);

    return {
      pet: pet.info
    };
  }
}
