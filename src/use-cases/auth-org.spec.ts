import { describe, it, expect, vi } from 'vitest';
import { AuthOrgUseCase } from './auth-org';
import { IncorrectCredentials } from './errors/incorrect-credentials';
import { type SearchOrgByEmailRepository } from '../repositories/org-repository';
import { Org } from '../entities/Org';
import { Address } from '../entities/value-objects/Address';
import { Coordinate } from '../entities/value-objects/Coordinate';

describe('Auth Org Use Case', () => {
  const orgAuthRequest = {
    email: 'fake_mail@mail.com',
    password: 'fake_password'
  };
  const mockOrgRepository: SearchOrgByEmailRepository = {
    async findByEmail (orgId: string) {
      return await Org.create({
        id: 'fake_id',
        address: new Address({
          cep: '123',
          city: 'fake city',
          coordinate: new Coordinate({ lat: 0, long: 0 }),
          number: 0,
          state: 'fake state',
          street: 'fake street'
        }),
        email: 'fake_mail@mail.com',
        name: 'fake name',
        owner: 'fake owner',
        password: 'fake_password',
        phone: 'fake phone'
      });
    }
  };

  it('Deve retornar um erro caso não seja encontrado uma org com o email informado',
    async () => {
      vi.spyOn(mockOrgRepository, 'findByEmail').mockResolvedValueOnce(null);
      const sut = new AuthOrgUseCase(mockOrgRepository);
      await expect(sut.execute(orgAuthRequest))
        .rejects
        .toBeInstanceOf(IncorrectCredentials);
    });
  it('Deve retornar um erro caso a senha esteja incorreta',
    async () => {
      const sut = new AuthOrgUseCase(mockOrgRepository);
      await expect(sut.execute({
        email: orgAuthRequest.email,
        password: 'wrong_password'
      })).rejects
        .toBeInstanceOf(IncorrectCredentials);
    });
  it('Deve retornar o id da Org caso email e senha estejam corretos', async () => {
    const sut = new AuthOrgUseCase(mockOrgRepository);
    const response = await sut.execute(orgAuthRequest);
    expect(response.id).toEqual(expect.any(String));
  });
});
