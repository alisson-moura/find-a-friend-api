import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFetchPetsByCity } from '../../../helpers/factories/make-use-cases';

export async function fetchPetsByCityController (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
  const { city } = requestParamsFetchPetsByCitySchema.parse(req.params);
  const query = requestQueryFetchPetsByCitySchema.parse(req.query);
  const useCase = makeFetchPetsByCity();
  const response = await useCase.execute({ city, query });
  return await res.status(200).send(response);
}

export const requestParamsFetchPetsByCitySchema = z.object({
  city: z.string().min(3)
});
export const requestQueryFetchPetsByCitySchema = z.object({
  type: z.string().optional(),
  energyLevel: z.coerce.number().optional(),
  independenceLevel: z.coerce.number().optional()
});
