import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerPetController (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
  const body = requestBodyRegisterPetSechema.parse(req.body);
  return await res.status(201).send({ id: req.user });
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
