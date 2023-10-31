import { type Pet } from '../entities/Pet';

export interface PetRepository extends
  CreatePetRepository,
  SearchPetRepository {}

export interface SearchPetRepository {
  findById: (petId: string) => Promise<Pet | null>
}

export interface CreatePetRepository {
  create: (pet: Pet, orgId: string) => Promise<void>
}
