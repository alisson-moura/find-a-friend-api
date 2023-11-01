import { beforeEach, it, describe, expect } from 'vitest';
import { Pet, type PetPropsConstructor } from './Pet';
import { Status } from './value-objects/Status';
import { Org } from './Org';
import { Address, type AddressProps } from './value-objects/Address';
import { Coordinate } from './value-objects/Coordinate';

describe('Pet', () => {
  let pet: Pet;
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
    id: '12345',
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

  beforeEach(() => {
    pet = new Pet(initialProps);
  });

  it('deve ser construído corretamente', () => {
    expect(pet.info.id).toEqual(initialProps.id);
    expect(pet.info.name).toEqual(initialProps.name);
    expect(pet.info.bio).toEqual(initialProps.bio);
    expect(pet.info.requirements).toEqual(initialProps.requirements);
    expect(pet.info.energyLevel).toEqual(initialProps.energyLevel);
    expect(pet.info.independenceLevel).toEqual(initialProps.independenceLevel);
  });

  it('deve atualizar o nome corretamente', () => {
    pet.updateName('fake_name');
    expect(pet.info.name).toEqual('fake_name');
  });

  it('deve atualizar a descrição (bio) corretamente', () => {
    pet.updateBio('fake bio');
    expect(pet.info.bio).toEqual('fake bio');
  });

  it('deve atualizar o nível de energia corretamente', () => {
    pet.updateEnergyLevel(4);
    expect(pet.info.energyLevel).toEqual(4);
  });

  it('deve atualizar o nível de independência corretamente', () => {
    pet.updateIndependenceLevel(4);
    expect(pet.info.independenceLevel).toEqual(4);
  });

  it('deve remover um requisito corretamente', () => {
    pet.removeRequirement('food');
    expect(pet.info.requirements).toEqual(['water']);
  });

  it('deve adicionar um requisito corretamente', () => {
    pet.addRequirement('space');
    expect(pet.info.requirements).toEqual(['water', 'space']);
  });

  it('deve adicionar uma foto corretamente', () => {
    pet.addPhoto('url_03');
    expect(pet.info.photos).toEqual(['url_01', 'url_02', 'url_03']);
  });

  it('deve retornar o status do', () => {
    expect(pet.status).toBeInstanceOf(Status);
  });

  it('deve criar um id caso não seja fornecido um', () => {
    const initialPropsWithoutId: PetPropsConstructor = {
      name: 'Fluffy',
      bio: 'A cute pet',
      org,
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
    const pet = new Pet(initialPropsWithoutId);
    expect(pet.info.id).toEqual(expect.any(String));
  });
});
