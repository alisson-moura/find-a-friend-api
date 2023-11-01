import { describe, it, expect } from 'vitest';
import { Address, type AddressProps } from './Address';
import { Coordinate } from './Coordinate';

describe('Address', () => {
  it('deve ser construído corretamente', () => {
    // Defina as propriedades iniciais
    const initialProps: AddressProps = {
      city: 'Sample City',
      state: 'Sample State',
      cep: '12345-678',
      number: 42,
      street: 'Sample Street',
      coordinate: new Coordinate({ lat: 1.23, long: 4.56 }) // Substitua pelo seu mock ou instância real de Coordinate
    };

    // Construa a instância de Address com as propriedades iniciais
    const address = new Address(initialProps);

    // Verifique se as propriedades da instância correspondem às propriedades iniciais
    expect(address.city).toBe(initialProps.city);
    expect(address.state).toBe(initialProps.state);
    expect(address.cep).toBe(initialProps.cep);
    expect(address.number).toBe(initialProps.number);
    expect(address.street).toBe(initialProps.street);

    // Verifique as coordenadas, assumindo que você está usando uma instância real de Coordinate
    expect(address.coordinate.lat).toBe(1.23);
    expect(address.coordinate.long).toBe(4.56);
  });
  it('deve configurar o lat long com 0 caso não seja fornecido', () => {
    // Defina as propriedades iniciais
    const initialProps: AddressProps = {
      city: 'Sample City',
      state: 'Sample State',
      cep: '12345-678',
      number: 42,
      street: 'Sample Street'
    };

    // Construa a instância de Address com as propriedades iniciais
    const address = new Address(initialProps);

    // Verifique as coordenadas, assumindo que você está usando uma instância real de Coordinate
    expect(address.coordinate.lat).toBe(0);
    expect(address.coordinate.long).toBe(0);
  });
});
