import fastifySwagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { env } from './env';
import app from './http';
import { type FastifyInstance } from 'fastify';
import { publicRoutes } from './http/controllers/routes';

async function run (app: FastifyInstance): Promise<void> {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'Org', description: 'User related end-points' },
        { name: 'Pet', description: 'Code related end-points' }
      ],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' }
          }
        }
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    transform: jsonSchemaTransform
  });
  await app.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next(); },
      preHandler: function (request, reply, next) { next(); }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
    transformSpecificationClone: true
  });
  await app.register(publicRoutes);
  await app.ready();
  app.swagger();
  await app.listen({ port: env.HTTP_PORT });
}

run(app)
  .then(() => {
    console.log('🚀 API running on http://localhost:' + env.HTTP_PORT);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
