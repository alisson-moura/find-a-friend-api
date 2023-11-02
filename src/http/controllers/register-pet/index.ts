import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterPetUseCase } from '../../../helpers/factories/make-use-cases';
import { ResourceNotFound } from '../../../app/use-cases/errors/resource-not-found';

export async function registerPetController (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
  const body = requestBodyRegisterPetSechema.parse(req.body);
  const useCase = makeRegisterPetUseCase()
  try {
    const response = await useCase.execute({...body, orgId: req.user.sub })
    return await res.status(201).send({ id:response.pet.id });
  } catch (error) {
    if(error instanceof ResourceNotFound) {
      return await res.status(400).send({message: error.message});
    }
    
    console.error(error)
    throw error
  }
}

export const requestBodyRegisterPetSechema = z.object({
  name: z.string(),
  bio: z.string(),
  energyLevel: z.number(),
  independenceLevel: z.number(),
  photos: z.array(z.string()),
  requirements: z.array(z.string()),
  animal: z.object({
    dateOfBirth: z.coerce.date(),
    size: z.number(),
    type: z.string()
  })
});
