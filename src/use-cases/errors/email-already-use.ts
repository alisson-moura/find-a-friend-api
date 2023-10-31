export class EmailAlreadyInUse extends Error {
  constructor () {
    super('O e-mail já está em uso por outra org');
  }
}
