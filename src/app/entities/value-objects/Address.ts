import { type Coordinate } from './Coordinate';

export interface AddressProps {
  city: string
  state: string
  cep: string
  number: number
  street: string
  coordinate?: Coordinate
}
export class Address {
  readonly #props: AddressProps;

  constructor (props: AddressProps) {
    this.#props = props;
  }

  get city (): string {
    return this.#props.city;
  }

  get street (): string {
    return this.#props.street;
  }

  get state (): string {
    return this.#props.state;
  }

  get cep (): string {
    return this.#props.cep;
  }

  get number (): number {
    return this.#props.number;
  }

  get coordinate (): { lat: number, long: number } {
    return this.#props.coordinate?.getCoordinates() ?? { lat: 0, long: 0 };
  }
}
