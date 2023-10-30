import { describe, expect, it, vi } from 'vitest';
import { RegisterPetUseCase } from './register-pet';
import { ResourceNotFound } from './errors/resource-not-found';
import { type OrgRepository } from '../repositories/org-repository';
import { Org } from '../entities/Org';
import { type Pet } from '../entities/Pet';
import { type PetRepository } from '../repositories/pet-repository';

describe('Register Pet Use Case', () => {
  const mockOrgRepository: OrgRepository = {
    async findById (orgId: string) {
      return new Org();
    }
  };
  const mockPetRepository: PetRepository = {
    create: async function (pet: Pet, orgId: string): Promise<void> {},
    findById: async function (petId: string): Promise<Pet | null> {
      return null;
    }
  };
  const fakeRequest = {
    orgId: 'fake_org_id',
    animal: {
      dateOfBirth: new Date(2020, 1, 1),
      type: 'dog',
      size: 25
    },
    bio: 'a cute pet',
    energyLevel: 3,
    independenceLevel: 2,
    name: 'flopy',
    photos: ['url_01', 'url_02'],
    requirements: ['water', 'food']
  };

  it('deve ser possível cadastrar um novo pet', async () => {
    const sut = new RegisterPetUseCase(mockOrgRepository, mockPetRepository);
    const { pet } = await sut.execute(fakeRequest);
    expect(pet).toHaveProperty('id');
  });

  it('não deve ser possível cadastrar um pet para uma org que não existe',
    async () => {
      vi.spyOn(mockOrgRepository, 'findById')
        .mockResolvedValueOnce(null);

      const sut = new RegisterPetUseCase(mockOrgRepository, mockPetRepository);
      await expect(sut.execute(fakeRequest))
        .rejects.toBeInstanceOf(ResourceNotFound);
    });
});
