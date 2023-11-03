import { type Type, type Prisma } from '@prisma/client';
import { prisma } from '..';
import { Pet } from '../../app/entities/Pet';
import { type PetRepository } from '../../app/repositories/pet-repository';
import { PrismaOrgRepository } from './prisma-org-repository';
import { Org } from '../../app/entities/Org';
import { Address } from '../../app/entities/value-objects/Address';
import { Coordinate } from '../../app/entities/value-objects/Coordinate';

export class PrismaPetRepository implements PetRepository {
  async findByCity (city: string, query?: {
    energyLevel?: number
    independenceLevel?: number
    type?: string
  }): Promise<Pet[]> {
    const prismaOrgs = await prisma.org.findMany({
      include: { address: true, pets: true },
      where: {
        address: {
          city
        }
      }
    });

    const where: Prisma.PetWhereInput = {
      org_id: {
        in: prismaOrgs.map(org => org.org_id)
      }
    };
    if (query != null) {
      if (query.independenceLevel != null) {
        where.independence_level = {
          equals: query.independenceLevel
        };
      }
      if (query.type != null) {
        where.type = {
          name: {
            equals: query.type
          }
        };
      }
    }

    const prismaPets = await prisma.pet.findMany({
      where,
      include: { photos: true, requirements: true, type: true }
    });

    const orgs = prismaOrgs.map(org => Org.restore({
      email: org.email,
      name: org.name,
      owner: org.owner,
      phone: org.phone,
      password: org.password,
      id: org.org_id,
      address: new Address({
        cep: org.address.cep,
        city: org.address.city,
        number: org.address.number,
        state: org.address.state,
        street: org.address.street,
        coordinate: new Coordinate({
          lat: org.address.lat.toNumber(),
          long: org.address.long.toNumber()
        })
      })
    }));

    return prismaPets.map(pet => new Pet({
      id: pet.pet_id,
      bio: pet.bio,
      energyLevel: pet.energy_level,
      name: pet.name,
      independenceLevel: pet.independence_level,
      photos: pet.photos.map(ph => ph.photo_url),
      requirements: pet.requirements.map(rq => rq.requirement),
      dateOfAdoption: pet.date_of_adoption,
      animal: {
        dateOfBirth: pet.date_of_birth,
        size: pet.size,
        type: pet.type.name
      },
      org: orgs[orgs.findIndex(org => org.contact.id === pet.org_id)]
    }));
  }

  async findById (petId: string): Promise<Pet | null> {
    const orgRepository = new PrismaOrgRepository();
    const prismaPet = await prisma.pet.findUnique({ where: { pet_id: petId }, include: { photos: true, requirements: true, type: true } });

    if (prismaPet != null) {
      const org = await orgRepository.findById(prismaPet.org_id);
      if (org === null) { throw new Error('Invalid Org Id'); }

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
      });
    }
    return null;
  }

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
