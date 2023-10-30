import { Pet } from '../entities/Pet';
import { type OrgRepository } from '../repositories/org-repository';
import { type PetRepository } from '../repositories/pet-repository';
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
  pet: {
    id: string
    name: string
    bio: string
    requirements: string[]
    energyLevel: number
    independenceLevel: number
    animal: {
      type: string
      age: {
        age: number
        classification: string
      }
      size: {
        size: number
        classification: string
      }
    }
    status: boolean
    photos: string[]
  }
}

export class RegisterPetUseCase {
  constructor (
    private readonly orgRepository: OrgRepository,
    private readonly petRepository: PetRepository
  ) { }

  async execute (props: Request): Promise<Response> {
    const org = await this.orgRepository.findById(props.orgId);
    if (org == null) {
      throw new ResourceNotFound('org');
    }
    const pet = new Pet({
      ...props,
      dateOfAdoption: null
    });

    await this.petRepository.create(pet, props.orgId);

    return {
      pet: pet.info
    };
  }
}
