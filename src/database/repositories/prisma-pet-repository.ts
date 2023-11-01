import { type Type } from '@prisma/client';
import { prisma } from '..';
import { type Pet } from '../../app/entities/Pet';
import { type CreatePetRepository } from '../../app/repositories/pet-repository';

export class PrismaPetRepository implements CreatePetRepository {
  async create (pet: Pet, orgId: string): Promise<void> {
    const { bio, energyLevel, name, id, independenceLevel, animal, requirements, photos } = pet.info;

    let type: Type | null;
    type = await prisma.type.findFirst({ where: { name: animal.type } });
    if (type == null) {
      type = await prisma.type.create({
        data: {
          name: animal.type
        }
      });
    }

    await prisma.pet.create({
      data: {
        org_id: orgId,
        independence_level: independenceLevel,
        energy_level: energyLevel,
        pet_id: id,
        bio,
        name,
        size: animal.size.size,
        type_id: type?.type_id,
        date_of_birth: animal.age.dateOfBirth,
        requirements: {
          create: requirements.map(r => ({ requirement: r }))
        },
        photos: {
          create: photos.map(ph => ({ photo_url: ph }))
        }
      }
    });
  }
}
