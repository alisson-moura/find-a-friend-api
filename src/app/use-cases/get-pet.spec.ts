import { describe, expect, it, vi } from 'vitest';
import { ResourceNotFound } from './errors/resource-not-found';
import { Pet } from '../app/entities/Pet';
import { type SearchPetRepository } from '../app/repositories/pet-repository';
import { GetPetUseCase } from './get-pet';
import { Org } from '../app/entities/Org';
import { type AddressProps, Address } from '../app/entities/value-objects/Address';
import { Coordinate } from '../app/entities/value-objects/Coordinate';

const address: AddressProps = {
  city: 'Sample City',
  state: 'Sample State',
  cep: '12345-678',
  number: 42,
  street: 'Sample Street',
  coordinate: new Coordinate({ lat: 0, long: 0 }) // Substitua pelo seu mock ou instância real de Coordinate
};
const org = Org.restore({
  address: new Address(address),
  email: 'fake_mail',
  name: 'fake name',
  owner: 'fake owner',
  password: 'fake_password',
  phone: 'fake_phone'
});
describe('Get Pet Use Case', () => {
  const mockPetRepository: SearchPetRepository = {
    findById: async function (petId: string): Promise<Pet | null> {
      return new Pet({
        animal: {
          dateOfBirth: new Date(2020, 1, 1),
          type: 'dog',
          size: 25
        },
        org,
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
