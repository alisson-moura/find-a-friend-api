import { Animal } from './Animal';
import { type SizeCriteria } from '../value-objects/Size';

export class Cat extends Animal {
  get ageCriteria (): { PUPPY: number, YOUNG: number, ADULT: number, ELDERLY: number } {
    return {
      PUPPY: 1,
      YOUNG: 3,
      ADULT: 7,
      ELDERLY: 8
    };
  }

  get sizeCriteria (): SizeCriteria {
    return {
      SMALL: 5,
      MEDIUM: 10,
      LARGE: 15,
      EXTRA_LARGE: 20
    };
  }
}
