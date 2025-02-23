import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {

    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Description of the API',
        },
        servers: [
            {
                url: `http://localhost:${process.env.API_PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                UserResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID (MongoDB ObjectId)',
                            format: 'uuid',
                        },
                        email: {
                            type: 'string',
                            description: 'Email address of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                            format: 'password',
                        },
                        roles: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Roles assigned to the user',
                        },
                        teacherId: {
                            type: 'string',
                            description: 'Teacher ID (MongoDB ObjectId)',
                            format: 'uuid',
                        },
                    },
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/API/Routers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);