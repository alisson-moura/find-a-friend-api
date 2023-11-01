import { describe, it, expect, vi } from 'vitest';
import { FetchPetsByCityUseCase } from './fetch-pets-by-city';
import { type SearchPetByCityRepository } from '../app/repositories/pet-repository';
import { type PetPropsConstructor, Pet } from '../app/entities/Pet';
import { randomUUID } from 'crypto';
import { Org } from '../app/entities/Org';
import { type AddressProps, Address } from '../app/entities/value-objects/Address';
import { Coordinate } from '../app/entities/value-objects/Coordinate';

describe('Fetch Pets by city Use Case', () => {
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

  const initialProps: PetPropsConstructor = {
    id: randomUUID(),
    org,
    name: 'Fluffy',
    bio: 'A cute pet',
    requirements: ['food', 'water'],
    energyLevel: 5,
    independenceLevel: 3,
    dateOfAdoption: null,
    animal: {
      dateOfBirth: new Date(2020, 1, 1),
      size: 20,
      type: 'dog'
    },
    photos: ['url_01', 'url_02']
  };

  const mockPetsRepository: SearchPetByCityRepository = {
    findByCity: async function (city: string): Promise<Pet[]> {
      return [];
    }
  };

  it('deve retornar a lista correta de pets quando há pets na cidade',
    async () => {
      vi.spyOn(mockPetsRepository, 'findByCity')
        .mockResolvedValueOnce([new Pet(initialProps), new Pet(initialProps)]);
      const sut = new FetchPetsByCityUseCase(mockPetsRepository);
      const { pets } = await sut.execute({ city: 'fake city' });
      expect(pets).toHaveLength(2);
    });

  it('deve retornar uma lista vazia quando não há pets na cidade', async () => {
    const sut = new FetchPetsByCityUseCase(mockPetsRepository);
    const { pets } = await sut.execute({ city: 'fake city' });
    expect(pets).toHaveLength(0);
  });
});
