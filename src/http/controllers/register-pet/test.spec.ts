import request from 'supertest';
import { randomUUID } from 'crypto';
import { type z } from 'zod';
import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import app from '../..';
import { mockOrgAndAuthToken } from '../../../helpers/tests/mock-org-and-auth-token';
import { type requestBodyRegisterPetSechema } from '.';

const fakeRequest: z.infer<typeof requestBodyRegisterPetSechema> = {
  name: 'John Doe',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  energyLevel: 7,
  independenceLevel: 8,
  photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
  requirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'],
  animal: {
    dateOfBirth: new Date('2010-05-15'),
    size: 35,
    type: 'Dog'
  }
};

describe('Register Pet Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('deve ser possível registrar um pet', async () => {
    const { token } = await mockOrgAndAuthToken();

    const response = await request(app.server)
      .post('/pets')
      .send(fakeRequest)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(201);
  });

  it.skip('deve retornar um erro caso a org informada esteja incorreta', async () => {
    // create an org
    await mockOrgAndAuthToken();
    // generate an fake token
    const fakeToken = app.jwt.sign({}, { sub: randomUUID() });

    const response = await request(app.server)
      .post('/pets')
      .send(fakeRequest)
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Recurso não encontrado: org');
  });
});
