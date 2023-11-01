import { describe, expect, test, beforeEach } from 'vitest';
import { Org } from './Org';
import { Coordinate } from './value-objects/Coordinate';
import { Address, type AddressProps } from './value-objects/Address';

describe('Org  Entity', () => {
  const address: AddressProps = {
    city: 'Sample City',
    state: 'Sample State',
    cep: '12345-678',
    number: 42,
    street: 'Sample Street',
    coordinate: new Coordinate({ lat: 0, long: 0 }) // Substitua pelo seu mock ou instância real de Coordinate
  };
  test('Deve ser possível criar uma nova org', async () => {
    const sut = await Org.create({
      address: new Address(address),
      email: 'fake_mail',
      name: 'fake name',
      owner: 'fake owner',
      password: 'fake_password',
      phone: 'fake_phone'
    });

    expect(sut).toBeInstanceOf(Org);
  });
  test('Deve ser possível restaurar uma org', async () => {
    const sut = Org.restore({
      address: new Address(address),
      email: 'fake_mail',
      name: 'fake name',
      owner: 'fake owner',
      password: 'fake_password',
      phone: 'fake_phone'
    });
    expect(sut).toBeInstanceOf(Org);
  });
  test('Deve ser possível retornar o contato de uma org', async () => {
    const sut = Org.restore({
      address: new Address(address),
      email: 'fake_mail',
      name: 'fake name',
      owner: 'fake owner',
      password: 'fake_password',
      phone: 'fake_phone'
    });

    const contact = sut.contact;
    expect(contact).toEqual(expect.objectContaining({
      name: 'fake name',
      email: 'fake_mail',
      phone: 'fake_phone',
      address: {
        number: 42,
        state: 'Sample State',
        street: 'Sample Street',
        city: 'Sample City',
        cep: '12345-678',
        coordinate: {
          lat: 0,
          long: 0
        }
      }
    }));
  });
  describe('Validar se as credencias de uma org estão corretas', () => {
    let sut: Org;
    beforeEach(async () => {
      sut = await Org.create({
        address: new Address(address),
        email: 'fake_mail',
        name: 'fake name',
        owner: 'fake owner',
        password: 'fake_password',
        phone: 'fake_phone'
      });
    });
    test('Deve retornar falso caso o email fornecido esteja incorreto', async () => {
      await expect(
        sut.validateCredentials({ email: 'incorrect@mail.com', password: 'fake_password' })
      )
        .resolves
        .toBe(false);
    });
    test('Deve retornar falso caso a senha fornecida esteja incorreta', async () => {
      await expect(
        sut.validateCredentials({ email: 'fake_mail', password: 'incorrect_password' })
      )
        .resolves
        .toBe(false);
    });
    test('Deve retornar true caso as credencias estejam corretas', async () => {
      await expect(
        sut.validateCredentials({ email: 'fake_mail', password: 'fake_password' })
      )
        .resolves
        .toBe(true);
    });
  });
});
