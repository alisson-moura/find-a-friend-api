import { randomUUID } from 'crypto';
import { compare, hash } from 'bcrypt';
import { type Address } from './value-objects/Address';

export interface OrgProps {
  id?: string
  name: string
  owner: string
  email: string
  password: string
  address: Address
  phone: string
}

export class Org {
  readonly #props: OrgProps;

  private constructor (props: OrgProps) {
    this.#props = props;
  }

  public async validateCredentials ({ email, password }: { email: string, password: string }): Promise<boolean> {
    if (email === this.#props.email) {
      return await compare(password, this.#props.password);
    }
    return false;
  }

  static async create (props: OrgProps): Promise<Org> {
    const org = new Org(props);
    const id = randomUUID();
    const hashPassword = await hash(props.password, 6);
    org.setId(id);
    org.setPassword(hashPassword);
    return org;
  }

  static restore (props: OrgProps): Org {
    const org = new Org(props);
    return org;
  }

  private setPassword (value: string): void {
    this.#props.password = value;
  }

  public setId (id: string): void {
    this.#props.id = id;
  }

  public get contact (): {
    name: string
    email: string
    phone: string
    address: {
      number: number
      state: string
      street: string
      city: string
      cep: string
      coordinate: {
        lat: number
        long: number
      }
    }
  } {
    return {
      name: this.#props.name,
      email: this.#props.email,
      phone: this.#props.phone,
      address: {
        number: this.#props.address.number,
        state: this.#props.address.state,
        street: this.#props.address.street,
        city: this.#props.address.city,
        cep: this.#props.address.cep,
        coordinate: this.#props.address.coordinate
      }
    };
  }
}
