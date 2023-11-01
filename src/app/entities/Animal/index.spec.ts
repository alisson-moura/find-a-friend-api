import { describe, it, expect } from 'vitest';
import { AnimalFactory } from '.';
import { Dog } from './Dog';
import { Cat } from './Cat';

describe('AnimalFactory', () => {
  it('deve criar uma instância de Dog corretamente', () => {
    const props = { type: 'dog', dateOfBirth: new Date(), size: 15 };
    const animal = AnimalFactory.create(props);
    expect(animal instanceof Dog).toBe(true);
  });

  it('deve criar uma instância de Cat corretamente', () => {
    const props = { type: 'cat', dateOfBirth: new Date(), size: 10 };
    const animal = AnimalFactory.create(props);
    expect(animal instanceof Cat).toBe(true);
  });

  it('deve lançar um erro para tipo de animal inválido', () => {
    const props = { type: 'bird', dateOfBirth: new Date(), size: 5 };
    expect(() => AnimalFactory.create(props)).toThrow('Invalid type of animal');
  });
});
