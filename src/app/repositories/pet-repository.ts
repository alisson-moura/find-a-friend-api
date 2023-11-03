import { type Pet } from '../entities/Pet';

export interface PetRepository extends
  CreatePetRepository,
  SearchPetRepository,
  SearchPetByCityRepository { }

export interface SearchPetRepository {
  findById: (petId: string) => Promise<Pet | null>
}

export interface SearchPetByCityRepository {
  findByCity: (city: string, query?: {
    energyLevel?: number
    independenceLevel?: number
    type?: string
  }) => Promise<Pet[]>
}

export interface CreatePetRepository {
  create: (pet: Pet, orgId: string) => Promise<void>
}
