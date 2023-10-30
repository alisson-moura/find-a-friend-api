import { type Pet } from '../entities/Pet';

export interface PetRepository {
  create: (pet: Pet, orgId: string) => Promise<void>
  findById: (petId: string) => Promise<Pet | null>
}
