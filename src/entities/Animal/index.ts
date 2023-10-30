/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type Animal } from './Animal';
import { Cat } from './Cat';
import { Dog } from './Dog';

export class AnimalFactory {
  static create (props: { type: string, dateOfBirth: Date, size: number }): Animal {
    if (props.type === 'dog') return new Dog(props);
    if (props.type === 'cat') return new Cat(props);
    throw new Error('Invalid type of animal');
  }
}
