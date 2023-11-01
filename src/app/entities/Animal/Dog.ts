import { Animal } from './Animal';
import { type SizeCriteria } from '../value-objects/Size';

export class Dog extends Animal {
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
      SMALL: 10,
      MEDIUM: 25,
      LARGE: 60,
      EXTRA_LARGE: 70
    };
  }
}
