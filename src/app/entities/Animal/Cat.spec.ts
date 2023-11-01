import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest';
import { AgeClassification } from '../value-objects/Age';
import { Cat } from './Cat';

describe('Cat', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 10, 30));
  });
  afterAll(() => {
    vi.useRealTimers();
  });
  it('deve retornar a classificação de idade corretamente', () => {
    const dateOfBirth = new Date('2020-01-01'); // Suponhamos que o gato nasceu em 1º de janeiro de 2020
    const cat = new Cat({ type: 'cat', dateOfBirth, size: 12 });
    const age = cat.age;

    expect(age.age).toEqual(3); // Deve ter 3 anos de idade
    expect(age.classification).toEqual(AgeClassification.YOUNG);
  });

  it('deve retornar a classificação de tamanho corretamente', () => {
    const cat = new Cat({ type: 'cat', dateOfBirth: new Date(), size: 18 });
    const size = cat.size;

    expect(size.size).toEqual(18);
    expect(size.classification).toEqual('Extra Large');
  });

  // Adicione mais testes conforme necessário
});
