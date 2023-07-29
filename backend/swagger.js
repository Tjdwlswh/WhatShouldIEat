import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: '뭐해먹지 백엔드 서버', // by default: 'REST API'
    description: 'API 명세서', // by default: ''
  },
  host: 'localhost:5000', // by default: 'localhost:3000'
  basePath: '/', // by default: '/'
  schemes: ['http'], // by default: ['http']
  consumes: ['application/json'], // by default: ['application/json']
  produces: ['application/json'], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '', // Tag description
    },
    // { ... }
  ], // by default: empty object
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './src/users/userRouter.js',
  './src/follows/followRouter.js',
  './src/recipes/recipeRouter.js',
];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc);
