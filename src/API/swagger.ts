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
    },
    apis: ['./src/API/Routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);