import { type FastifyReply, type FastifyRequest } from 'fastify';

export async function auth (req: FastifyRequest, res: FastifyReply): Promise<void> {
  try {
    await req.jwtVerify();
  } catch (error) {
    return await res.status(401).send();
  }
}
