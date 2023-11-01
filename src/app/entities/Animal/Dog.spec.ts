import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest';
import { Dog } from './Dog';
import { AgeClassification } from '../value-objects/Age';

describe('Dog', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 10, 30));
  });
  afterAll(() => {
    vi.useRealTimers();
  });
  it('deve retornar a classificação de idade corretamente', () => {
    const dateOfBirth = new Date('2019-01-01'); // Suponhamos que o cachorro nasceu em 1º de janeiro de 2019
    const dog = new Dog({ type: 'dog', dateOfBirth, size: 30 });
    const age = dog.age;

    expect(age.age).toEqual(4); // Deve ter 4 anos de idade
    expect(age.classification).toEqual(AgeClassification.ADULT);
  });

  it('deve retornar a classificação de tamanho corretamente', () => {
    const dog = new Dog({ type: 'dog', dateOfBirth: new Date(), size: 50 });
    const size = dog.size;

    expect(size.size).toEqual(50);
    expect(size.classification).toEqual('Large');
  });

  // Adicione mais testes conforme necessário
});
