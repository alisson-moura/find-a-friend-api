import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import { privateRoutes, publicRoutes } from './controllers/routes';
import { env } from '../env';
import { AppError } from '../app/entities/App-Error';
import { ZodError } from 'zod';
import { swaggerConfig, swaggerUI } from '../helpers/documentation/swaggerDoc';
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';

const app = Fastify({
  logger: env.NODE_ENV === 'dev'
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

if (env.NODE_ENV !== 'test') {
  void app.register(import('@fastify/swagger'),
    swaggerConfig);

  void app.register(import('@fastify/swagger-ui'),
    swaggerUI);
  void app.ready().then(() => {
    app.swagger();
  });
}

void app.register(jwt, { secret: env.JWT_SECRET });
void app.register(publicRoutes);
void app.register(privateRoutes);

app.setErrorHandler((err, request, reply) => {
  if (err instanceof AppError) {
    return reply.status(400).send({ message: err.message });
  }
  if (err instanceof ZodError) {
    return reply.status(400)
      .send({ message: 'Validation error', issues: err.format() });
  }
  if (env.NODE_ENV !== 'production') {
    console.error(err);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error.' });
});

export default app;
