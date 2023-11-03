import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetPetUseCase } from '../../../helpers/factories/make-use-cases';
import { ResourceNotFound } from '../../../app/use-cases/errors/resource-not-found';

export async function getPetController (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
  const { petId } = requestParamsGetPetSchema.parse(req.params);
  const useCase = makeGetPetUseCase();
  try {
    const response = await useCase.execute({ petId });
    return await res.status(200).send(response);
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return await res.status(400).send({ message: error.message });
    }

    console.error(error);
    throw error;
  }
}

export const requestParamsGetPetSchema = z.object({
  petId: z.string().uuid()
});
