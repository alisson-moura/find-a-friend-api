export class IncorrectCredentials extends Error {
  constructor () {
    super('O e-mail ou senha estão incorretos');
  }
}
