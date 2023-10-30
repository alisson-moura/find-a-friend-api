import { describe, expect, it, vi } from 'vitest';
import { RegisterPetUseCase } from './register-pet';
import { ResourceNotFound } from './errors/resource-not-found';
import { Pet } from '../entities/Pet';
import { type PetRepository } from '../repositories/pet-repository';

describe('Get Pet Use Case', () => {
  const mockPetRepository: PetRepository = {
    create: async function (pet: Pet, orgId: string): Promise<void> {},
    findById: async function (petId: string): Promise<Pet | null> {
      return new Pet({
        animal: {
          dateOfBirth: new Date(2020, 1, 1),
          type: 'dog',
          size: 25
        },
        bio: 'a cute pet',
        dateOfAdoption: null,
        energyLevel: 3,
        independenceLevel: 2,
        name: 'flopy',
        photos: ['url_01', 'url_02'],
        requirements: ['water', 'food']
      });
    }
  };

  it('deve ser possível buscar um pet pelo ID', async () => {
    const sut = new GetPetUseCase(mockPetRepository);
    const { pet } = await sut.execute({ petId: 'fake_id' });
    expect(pet).toHaveProperty('id');
  });

  it('não deve ser possível buscar um pet com um ID incorreto',
    async () => {
      vi.spyOn(mockPetRepository, 'findById')
        .mockResolvedValueOnce(null);

      const sut = new GetPetUseCase(mockPetRepository);
      await expect(sut.execute({ petId: 'fake_id' }))
        .rejects.toBeInstanceOf(ResourceNotFound);
    });
});
