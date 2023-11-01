import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest';
import { Age, AgeClassification, type AgeCriteria } from './Age';

describe('Age', () => {
  // Critérios de idade de exemplo para testes
  const ageCriteria: AgeCriteria = {
    PUPPY: 1,
    YOUNG: 3,
    ADULT: 7,
    ELDERLY: 10
  };

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 10, 30));
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it('calcula a idade corretamente', () => {
    const dateOfBirth = new Date('2015-01-01');
    const age = new Age(dateOfBirth, ageCriteria);
    expect(age.age()).toEqual(8); // Deve ter 8 anos de idade
  });

  it('classifica corretamente como filhote', () => {
    const dateOfBirthPuppy = new Date('2022-01-01');
    const age = new Age(dateOfBirthPuppy, ageCriteria);
    expect(age.classification()).toEqual(AgeClassification.PUPPY);
  });

  it('classifica corretamente como Jovem', () => {
    const dateOfBirthPuppy = new Date('2020-01-01');
    const age = new Age(dateOfBirthPuppy, ageCriteria);
    expect(age.classification()).toEqual(AgeClassification.YOUNG);
  });

  it('classifica corretamente como adulto', () => {
    const dateOfBirthAdult = new Date('2016-01-01');
    const age = new Age(dateOfBirthAdult, ageCriteria);
    expect(age.classification()).toEqual(AgeClassification.ADULT);
  });

  it('classifica corretamente como idoso', () => {
    const dateOfBirthElderly = new Date('2010-01-01');
    const age = new Age(dateOfBirthElderly, ageCriteria);
    expect(age.classification()).toEqual(AgeClassification.ELDERLY);
  });
});
