import { describe, expect, it, vi } from 'vitest';
import { RegisterPetUseCase } from './register-pet';
import { ResourceNotFound } from './errors/resource-not-found';
import { type SearchOrgByIdRepository } from '../repositories/org-repository';
import { Org } from '../entities/Org';
import { type Pet } from '../entities/Pet';
import { type CreatePetRepository } from '../repositories/pet-repository';
import { Address } from '../entities/value-objects/Address';
import { Coordinate } from '../entities/value-objects/Coordinate';

describe('Register Pet Use Case', () => {
  const mockOrgRepository: SearchOrgByIdRepository = {
    async findById (orgId: string) {
      return Org.restore({
        id: 'fake_id',
        address: new Address({
          cep: '123',
          city: 'fake city',
          coordinate: new Coordinate({ lat: 0, long: 0 }),
          number: 0,
          state: 'fake state',
          street: 'fake street'
        }),
        email: 'fake_mail',
        name: 'fake name',
        owner: 'fake owner',
        password: 'fake password',
        phone: 'fake phone'
      });
    }
  };
  const mockPetRepository: CreatePetRepository = {
    create: async function (pet: Pet, orgId: string): Promise<void> {}
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
