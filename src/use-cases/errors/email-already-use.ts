export class EmailAlreadyInUse extends Error {
  constructor (resource: string) {
    super('O e-mail já está em uso por outra org');
  }
}
