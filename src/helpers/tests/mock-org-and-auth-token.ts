import { type Org } from '@prisma/client';
import { prisma } from '../../database';
import { hash } from 'bcrypt';
import app from '../../http';

export async function mockOrgAndAuthToken (): Promise<{ org: Org, token: string }> {
  const org = await prisma.org.create({
    data: {
      name: 'fakeNome do Usuário',
      owner: 'fakeNome do Proprietário',
      email: 'fake_email@example.com',
      password: await hash('fakeSenhaSegura123', 6),
      phone: '12345678900',
      address: {
        create: {
          cep: 'fake12345-678',
          city: 'fakeCity Name',
          number: 123,
          state: 'FS',
          street: 'fakeNome da Rua',
          lat: 0,
          long: 0
        }
      }
    }
  });

  return {
    org,
    token: app.jwt.sign({}, { sub: org.org_id })
  };
}
