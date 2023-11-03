import { type FastifySchema } from 'fastify';
import { z } from 'zod';

export const requestBodyRegisterOrgSchema = z.object({
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
  body: requestBodyRegisterOrgSchema,
  response: {
    201: z.null(),
    409: z.object({
      message: z.string().default('O e-mail já está em uso por outra org')
    })
  },
  tags: ['org']
};
