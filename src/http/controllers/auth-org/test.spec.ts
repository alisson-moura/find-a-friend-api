import request from 'supertest';
import { expect, describe, it, beforeAll, afterAll, beforeEach } from 'vitest';
import app from '../..';
import { type requestBodyAuthOrgSechema } from '.';
import { type z } from 'zod';
import { prisma } from '../../../database';
import { hash } from 'bcrypt';

const fakeRequest: z.infer<typeof requestBodyAuthOrgSechema> = {
  email: 'fake_email@example.com',
  password: 'fakeSenhaSegura123'
};
describe('Auth Org Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.org.create({
      data: {
        name: 'fakeNome do Usuário',
        owner: 'fakeNome do Proprietário',
        email: 'fake_email@example.com',
        password: await hash('fakeSenhaSegura123', 6),
        phone: '12345678900',
        address: {
          create: {
            cep: 'fake12345-678',
            city: 'fakeCidade',
            number: 123,
            state: 'FS',
            street: 'fakeNome da Rua',
            lat: 0,
            long: 0
          }
        }
      }
    });
  });
  it('deve ser possível realizar login com uma org', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send(fakeRequest);

    expect(response.statusCode).toEqual(200);
    expect(response.body.token).toEqual(expect.any(String));
  });

  it('deve retornar um erro caso o e-mail esteja incorreto', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send({
        password: fakeRequest.password,
        email: 'wrongMail@mail.com'
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message)
      .toEqual('O e-mail ou senha estão incorretos');
  });
  it('deve retornar um erro caso a senha esteja incorreto', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send({
        password: 'wrongPassword',
        email: fakeRequest.email
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message)
      .toEqual('O e-mail ou senha estão incorretos');
  });
});
