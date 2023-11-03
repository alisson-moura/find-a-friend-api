import { type FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { type FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  transform: jsonSchemaTransform,
  swagger: {
    info: {
      title: 'API FindAFriend',
      description: 'API de adoção de animais',
      version: '0.1.0'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'pet', description: 'Pet related end-points' },
      { name: 'org', description: 'Org related end-points' },
      { name: 'session', description: 'Session related end-points' }
    ]
  }
};

export const swaggerUI: FastifySwaggerUiOptions = {
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
};
