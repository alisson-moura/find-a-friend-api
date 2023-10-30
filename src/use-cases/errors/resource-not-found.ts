export class ResourceNotFound extends Error {
  constructor (resource: string) {
    super(`Recurso não encontrado: [${resource}]`);
  }
}
