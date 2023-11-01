import { describe, it, expect } from 'vitest';
import { Size, SizeClassification, type SizeCriteria } from './Size';

describe('Size', () => {
  // Critérios de tamanho de exemplo para testes
  const sizeCriteria: SizeCriteria = {
    SMALL: 10,
    MEDIUM: 25,
    LARGE: 40,
    EXTRA_LARGE: 60
  };

  it('classifica como pequeno corretamente', () => {
    const size = new Size(5, sizeCriteria);
    expect(size.classification).toEqual(SizeClassification.SMALL);
  });

  it('classifica como médio corretamente', () => {
    const size = new Size(15, sizeCriteria);
    expect(size.classification).toEqual(SizeClassification.MEDIUM);
  });

  it('classifica como grande corretamente', () => {
    const size = new Size(35, sizeCriteria);
    expect(size.classification).toEqual(SizeClassification.LARGE);
  });

  it('classifica como extra grande corretamente', () => {
    const size = new Size(70, sizeCriteria);
    expect(size.classification).toEqual(SizeClassification.EXTRA_LARGE);
  });
});
