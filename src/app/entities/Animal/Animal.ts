import { Age, type AgeCriteria } from '../value-objects/Age';
import { Size, type SizeCriteria } from '../value-objects/Size';

interface AnimalConstructor {
  type: string
  dateOfBirth: Date
  size: number
}

export abstract class Animal {
  protected _type: string;
  protected _dateOfBirth: Date;
  protected _size: number;

  constructor (props: AnimalConstructor) {
    this._type = props.type;
    this._dateOfBirth = props.dateOfBirth;
    this._size = props.size;
  }

  protected abstract get sizeCriteria (): SizeCriteria;
  protected abstract get ageCriteria (): AgeCriteria;

  get age (): { age: number, classification: string, dateOfBirth: Date } {
    const currentAge = new Age(this._dateOfBirth, this.ageCriteria);
    return {
      age: currentAge.age(),
      classification: currentAge.classification(),
      dateOfBirth: this.dateOfBirth
    };
  }

  get dateOfBirth (): Date {
    return this._dateOfBirth;
  }

  get size (): { size: number, classification: string } {
    const obj = new Size(this._size, this.sizeCriteria);
    return {
      classification: obj.classification,
      size: this._size
    };
  }

  get type (): string {
    return this._type;
  }
}
