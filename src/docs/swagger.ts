import swaggerJsdoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartBiz API',
      version: '1.0.0',
      description: 'Do‘kon boshqaruv tizimi — API dokumentatsiyasi',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  // Keyin route fayllarini shu yerga qo‘shasiz
  apis: ['./src/routes/*.ts', './src/docs/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;