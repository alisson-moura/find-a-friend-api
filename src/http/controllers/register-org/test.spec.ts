import request from 'supertest';
import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import app from '../..';
import { type requestBodyRegisterOrgSchema } from '.';
import { type z } from 'zod';

const fakeRequest: z.infer<typeof requestBodyRegisterOrgSchema> = {
  name: 'fakeNome do Usuário',
  owner: 'fakeNome do Proprietário',
  email: 'fake_email@example.com',
  password: 'fakeSenhaSegura123',
  phone: '12345678900',
  address: {
    cep: 'fake12345-678',
    city: 'fakeCidade',
    number: 123,
    state: 'FS',
    street: 'fakeNome da Rua'
  }
};
describe('Register Org Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('deve ser possível registrar uma org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send(fakeRequest);
    expect(response.statusCode).toEqual(201);
  });

  it('deve retornar o status 409 e uma mensagem caso o email já esteja em uso', async () => {
    // registra a primeira Org
    await request(app.server)
      .post('/orgs')
      .send(fakeRequest);

    // tenta registrar novamente com o e-mail já em uso
    const response = await request(app.server)
      .post('/orgs')
      .send(fakeRequest);

    expect(response.statusCode).toEqual(409);
    expect(response.body.message).toEqual('O e-mail já está em uso por outra org');
  });
});
