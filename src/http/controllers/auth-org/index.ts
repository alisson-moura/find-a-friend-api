import { z } from 'zod';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { makeAuthOrgUseCase } from '../../../helpers/factories/make-use-cases';
import { IncorrectCredentials } from '../../../app/use-cases/errors/incorrect-credentials';
import app from '../..';

export async function authOrgController (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
  const body = requestBodyAuthOrgSechema.parse(req.body);
  const useCase = makeAuthOrgUseCase();
  try {
    const { id } = await useCase.execute(body);
    const token = app.jwt.sign({}, { sub: id });
    return await res.status(200).send({ token });
  } catch (error) {
    if (error instanceof IncorrectCredentials) {
      return await res.status(400).send({ message: error.message });
    }
    throw error;
  }
}

export const requestBodyAuthOrgSechema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
