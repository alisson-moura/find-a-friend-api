import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest';
import { Animal } from './Animal';
import { AgeClassification, type AgeCriteria } from '../value-objects/Age';
import { SizeClassification, type SizeCriteria } from '../value-objects/Size';

class MockAnimal extends Animal {
  protected sizeCriteria: SizeCriteria = {
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 30,
    EXTRA_LARGE: 40
  };

  protected ageCriteria: AgeCriteria = {
    PUPPY: 1,
    YOUNG: 3,
    ADULT: 7,
    ELDERLY: 10
  };
}

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2023, 10, 30));
});
afterAll(() => {
  vi.useRealTimers();
});

describe('Animal', () => {
  it('deve retornar a idade corretamente', () => {
    const dateOfBirth = new Date('2016-01-01');
    const mockAnimal = new MockAnimal({ type: 'dog', dateOfBirth, size: 15 });
    const age = mockAnimal.age;

    expect(age.age).toEqual(7); // Deve ter 7 anos de idade
    expect(age.classification).toEqual(AgeClassification.ADULT);
  });

  it('deve retornar o tamanho corretamente', () => {
    const mockAnimal = new MockAnimal({ type: 'dog', dateOfBirth: new Date(), size: 25 });
    const size = mockAnimal.size;

    expect(size.size).toEqual(25);
    expect(size.classification).toEqual(SizeClassification.LARGE);
  });

  it('deve retornar o tipo corretamente', () => {
    const mockAnimal = new MockAnimal({ type: 'cat', dateOfBirth: new Date(), size: 10 });
    expect(mockAnimal.type).toEqual('cat');
  });
});
