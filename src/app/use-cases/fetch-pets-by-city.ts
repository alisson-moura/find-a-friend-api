import { type PetInfos } from '../../app/entities/Pet';
import { type SearchPetByCityRepository } from '../../app/repositories/pet-repository';

interface Request {
  city: string
  query?: {
    energyLevel?: number
    independenceLevel?: number
    type?: 'string'
    size?: 'string'
  }
}

export class FetchPetsByCityUseCase {
  constructor (
    private readonly petRepository: SearchPetByCityRepository
  ) {}

  async execute (props: Request): Promise <{ pets: PetInfos[] }> {
    const pets = await this.petRepository.findByCity(props.city, props.query);
    return {
      pets: pets.map(pet => pet.info)
    };
  }
}
