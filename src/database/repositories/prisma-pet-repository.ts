import { type Type } from '@prisma/client';
import { prisma } from '..';
import { Pet } from '../../app/entities/Pet';
import { SearchPetRepository, type CreatePetRepository } from '../../app/repositories/pet-repository';
import { Photo } from '../../app/entities/value-objects/Photo';
import { Org } from '../../app/entities/Org';
import { PrismaOrgRepository } from './prisma-org-repository';

export class PrismaPetRepository implements CreatePetRepository, SearchPetRepository {
  async findById(petId: string): Promise<Pet | null> {
    const orgRepository = new PrismaOrgRepository();
    const prismaPet = await prisma.pet.findUnique({ where: { pet_id: petId }, include: { photos: true, requirements: true, type: true } })

    if (prismaPet != null) {
      const org = await orgRepository.findById(prismaPet.org_id)
      if (org === null)
        throw new Error('Invalid Org Id')

      return new Pet({
        id: prismaPet.pet_id,
        bio: prismaPet.bio,
        energyLevel: prismaPet.energy_level,
        name: prismaPet.name,
        independenceLevel: prismaPet.independence_level,
        photos: prismaPet.photos.map(ph => ph.photo_url),
        requirements: prismaPet.requirements.map(rq => rq.requirement),
        dateOfAdoption: prismaPet.date_of_adoption,
        animal: {
          dateOfBirth: prismaPet.date_of_birth,
          size: prismaPet.size,
          type: prismaPet.type.name
        },
        org
      })
    }
    return null
  }
  async create(pet: Pet, orgId: string): Promise<void> {
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
