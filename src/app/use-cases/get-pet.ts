import { type PetInfos } from '../../app/entities/Pet';
import { type SearchPetRepository } from '../../app/repositories/pet-repository';
import { ResourceNotFound } from './errors/resource-not-found';

interface Request {
  petId: string
}

interface Response {
  pet: PetInfos
}

export class GetPetUseCase {
  constructor (
    private readonly petRepository: SearchPetRepository
  ) { }

  async execute (props: Request): Promise<Response> {
    const pet = await this.petRepository.findById(props.petId);
    if (pet == null) {
      throw new ResourceNotFound('pet');
    }

    return {
      pet: pet.info
    };
  }
}
