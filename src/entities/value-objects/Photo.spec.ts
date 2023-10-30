import { describe, it, expect } from 'vitest';
import { Photo } from './Photo';

describe('Photo', () => {
  it('deve retornar a URL corretamente', () => {
    const url = 'https://example.com/photo.jpg';
    const photo = new Photo(url);
    expect(photo.url).toEqual(url);
  });
});
