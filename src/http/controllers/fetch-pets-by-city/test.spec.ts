import request from 'supertest';
import { type z } from 'zod';
import { expect, describe, it, beforeAll, afterAll, beforeEach } from 'vitest';
import app from '../..';
import { mockOrgAndAuthToken } from '../../../helpers/tests/mock-org-and-auth-token';
import { type requestBodyRegisterPetSechema } from '../register-pet';

const fakeRequestRegisterPet: z.infer<typeof requestBodyRegisterPetSechema> = {
  name: 'John Doe',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  energyLevel: 7,
  independenceLevel: 8,
  photos: [],
  requirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'],
  animal: {
    dateOfBirth: new Date('2010-05-15'),
    size: 35,
    type: 'dog'
  }
};

const fakeCityName = 'fakeCity Name';

describe('Fetch Pets By City Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const { token } = await mockOrgAndAuthToken();

    // create an fake pet
    await request(app.server)
      .post('/pets')
      .send(fakeRequestRegisterPet)
      .set('Authorization', `Bearer ${token}`);

    // create an fake pet
    await request(app.server)
      .post('/pets')
      .send(fakeRequestRegisterPet)
      .set('Authorization', `Bearer ${token}`);
  });

  it('deve ser possível exibir filtrar os pets por cidade', async () => {
    const response = await request(app.server)
      .get(`/pets/city/${fakeCityName}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets.length).toBe(2);
  });
  it('deve retornar um array vazio caso não tenha nenhum pet na cidade', async () => {
    const response = await request(app.server)
      .get('/pets/city/wrongCityName');

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets.length).toBe(0);
  });
});
