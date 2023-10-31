import { type FastifySchema } from 'fastify/types/schema';
import { z } from 'zod';

export const registerOrgBodySchema = z.object({
  name: z.string().min(3),
  owner: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().length(11),
  address: z.object({
    city: z.string().min(3),
    state: z.string().length(2).toUpperCase(),
    cep: z.string().min(9, 'Por favor informe um CEP válido (00000-000)'),
    number: z.coerce.number().min(1, 'Por favor informe um número válido'),
    street: z.string().min(1, 'Por favor ruma rua válida')
  })
});

export const registerOrgSchema: FastifySchema = {
  description: 'Create an org',
  tags: ['Org'],
  summary: 'Create an org',
  body: registerOrgBodySchema
};
