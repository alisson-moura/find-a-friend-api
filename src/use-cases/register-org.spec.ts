import { describe, expect, it, vi } from 'vitest';
import { type CreateOrgRepository, type SearchOrgByEmailRepository } from '../repositories/org-repository';
import { Org } from '../entities/Org';
import { Address } from '../entities/value-objects/Address';
import { Coordinate } from '../entities/value-objects/Coordinate';
import { EmailAlreadyInUse } from './errors/email-already-use';
import { RegisterOrgUseCase } from './register-org';

describe('Register Org Use Case', () => {
  const mockOrgRepository: SearchOrgByEmailRepository & CreateOrgRepository = {
    async find (orgEmail: string) {
      return null;
    },
    async create (org: Org): Promise<Org> {
      return org;
    }
  };
  const fakeRequest = {
    name: 'fake name',
    owner: 'fake owner',
    email: 'fake@mail.com',
    password: 'fake_password',
    phone: 'fake phone',
    address: {
      city: 'fake city',
      state: 'fake state',
      cep: 'fake cep',
      number: 10,
      street: 'fake street',
      coordinate: {
        lat: 0,
        long: 0
      }
    }
  };

  it('deve ser possível cadastrar uma nova org', async () => {
    const sut = new RegisterOrgUseCase(mockOrgRepository);
    await expect(sut.execute(fakeRequest)).resolves.toEqual(undefined);
  });

  it('deve atribuir por padrão o valor zero para lat e long caso não seja informados', async () => {
    const sut = new RegisterOrgUseCase(mockOrgRepository);
    await expect(sut.execute({
      name: 'fake name',
      owner: 'fake owner',
      email: 'fake@mail.com',
      password: 'fake_password',
      phone: 'fake phone',
      address: {
        city: 'fake city',
        state: 'fake state',
        cep: 'fake cep',
        number: 10,
        street: 'fake street'
      }
    })).resolves.toEqual(undefined);
  });

  it('não deve ser possível registrar uma org com um e-mail que já está em uso',
    async () => {
      vi.spyOn(mockOrgRepository, 'find')
        .mockResolvedValueOnce(Org.restore({
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
        }));

      const sut = new RegisterOrgUseCase(mockOrgRepository);
      await expect(sut.execute(fakeRequest))
        .rejects.toBeInstanceOf(EmailAlreadyInUse);
    });
});
