import { describe, it, expect } from 'vitest';
import { Status } from './Status';

describe('Status', () => {
  it('verifica se está disponível inicialmente', () => {
    const status = new Status(null);
    expect(status.isAvailable()).toEqual(true);
  });

  it('verifica a disponibilidade após a adoção', () => {
    const status = new Status(null);
    status.adoption();
    expect(status.isAvailable()).toEqual(false);
  });

  it('verifica a disponibilidade após a definição da data de adoção', () => {
    const dateOfAdoption = new Date('2023-10-30');
    const status = new Status(dateOfAdoption);
    expect(status.isAvailable()).toEqual(false);
  });

  it('verifica a data de adoção após a adoção', () => {
    const status = new Status(null);
    status.adoption();
    expect(status.isAvailable()).toEqual(false);
  });
});
