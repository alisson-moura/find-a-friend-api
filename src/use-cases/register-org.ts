import { Org } from '../entities/Org';
import { Address } from '../entities/value-objects/Address';
import { Coordinate } from '../entities/value-objects/Coordinate';
import { type CreateOrgRepository, type SearchOrgByEmailRepository } from '../repositories/org-repository';
import { EmailAlreadyInUse } from './errors/email-already-use';

interface Request {
  name: string
  owner: string
  email: string
  password: string
  address: {
    city: string
    state: string
    cep: string
    number: number
    street: string
    coordinate?: {
      lat: number
      long: number
    }
  }
  phone: string
}

export class RegisterOrgUseCase {
  constructor (
    private readonly orgRepository: SearchOrgByEmailRepository & CreateOrgRepository
  ) { }

  async execute (props: Request): Promise<void> {
    const isEmailInUse = await this.orgRepository.find(props.email);
    if (isEmailInUse != null) {
      throw new EmailAlreadyInUse();
    }

    const address = new Address({
      cep: props.address.cep,
      city: props.address.city,
      number: props.address.number,
      state: props.address.state,
      street: props.address.street,
      coordinate: new Coordinate({
        lat: props.address.coordinate?.lat ?? 0,
        long: props.address.coordinate?.long ?? 0
      })
    });

    const org = await Org.create({
      address,
      email: props.email,
      name: props.name,
      owner: props.owner,
      password: props.password,
      phone: props.phone
    });

    await this.orgRepository.create(org);
  }
}
