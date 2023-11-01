import { prisma } from '..';
import { Org } from '../../app/entities/Org';
import { Address } from '../../app/entities/value-objects/Address';
import { Coordinate } from '../../app/entities/value-objects/Coordinate';
import { type OrgRepository } from '../../app/repositories/org-repository';

export class PrismaOrgRepository implements OrgRepository {
  async findById (orgId: string): Promise<Org | null> {
    const prismaOrg = await prisma.org.findUnique({
      where: {
        org_id: orgId
      },
      include: {
        address: true
      }
    });
    if (prismaOrg != null) {
      const org = Org.restore({
        email: prismaOrg.email,
        name: prismaOrg.name,
        owner: prismaOrg.owner,
        phone: prismaOrg.phone,
        password: prismaOrg.password,
        id: prismaOrg.org_id,
        address: new Address({
          cep: prismaOrg.address.cep,
          city: prismaOrg.address.city,
          number: prismaOrg.address.number,
          state: prismaOrg.address.state,
          street: prismaOrg.address.street,
          coordinate: new Coordinate({
            lat: prismaOrg.address.lat.toNumber(),
            long: prismaOrg.address.long.toNumber()
          })
        })
      });
      return org;
    }
    return null;
  }

  async findByEmail (orgEmail: string): Promise<Org | null> {
    const prismaOrg = await prisma.org.findUnique({
      where: {
        email: orgEmail
      },
      include: {
        address: true
      }
    });
    if (prismaOrg != null) {
      const org = Org.restore({
        email: prismaOrg.email,
        name: prismaOrg.name,
        owner: prismaOrg.owner,
        phone: prismaOrg.phone,
        password: prismaOrg.password,
        id: prismaOrg.org_id,
        address: new Address({
          cep: prismaOrg.address.cep,
          city: prismaOrg.address.city,
          number: prismaOrg.address.number,
          state: prismaOrg.address.state,
          street: prismaOrg.address.street,
          coordinate: new Coordinate({
            lat: prismaOrg.address.lat.toNumber(),
            long: prismaOrg.address.long.toNumber()
          })
        })
      });
      return org;
    }
    return null;
  }

  async create (org: Org): Promise<Org> {
    const { address, phone, name, email, id, owner } = org.contact;

    await prisma.org.create({
      include: {
        address: true
      },
      data: {
        org_id: id,
        password: org.password,
        email,
        name,
        owner,
        phone,
        address: {
          create: {
            cep: address.cep,
            city: address.city,
            number: address.number,
            street: address.street,
            state: address.state,
            lat: address.coordinate.lat,
            long: address.coordinate.long
          }
        }
      }
    });

    return org;
  }
}
