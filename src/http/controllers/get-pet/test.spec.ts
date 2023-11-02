import request from 'supertest';
import { randomUUID } from 'crypto';
import { type z } from 'zod';
import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import app from '../..';
import { mockOrgAndAuthToken } from '../../../helpers/tests/mock-org-and-auth-token';
import { requestBodyRegisterPetSechema } from '../register-pet';


const fakeRequestRegisterPet: z.infer<typeof requestBodyRegisterPetSechema> = {
  name: 'John Doe',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  energyLevel: 7,
  independenceLevel: 8,
  photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
  requirements: ['Requirement 1', 'Requirement 2', 'Requirement 3'],
  animal: {
    dateOfBirth: new Date('2010-05-15'),
    size: 35,
    type: 'dog'
  }
};

describe('Get Pet Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('deve ser possível exibir as informações de um pet pelo id', async () => {
    const { token, org } = await mockOrgAndAuthToken();

    // create an fake pet
    const { body: pet } = await request(app.server)
      .post('/pets')
      .send(fakeRequestRegisterPet)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(expect.objectContaining({
        id: pet.id,
    }));
  });

  it('deve retornar um erro caso o id  do pet esteja incorreto', async () => {
    const wrongPetId = randomUUID()

    const response = await request(app.server)
      .get(`/pets/${wrongPetId}`)

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Recurso não encontrado: [pet]');
  });
});
