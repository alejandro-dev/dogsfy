import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Configuración de Swagger
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Dogsfy Test Indigitall',
            version: '1.0.0',
            description: 'API documentation for the Dogsfy app',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                },
            },
            responses:{
                BadRequest : {
                    description: "Incorrect request",
                    content: {
                        "application/json":{
                            example: {
                                "error": {
                                    "status": "fail",
                                    "statusCode": 400,
                                    "message": "Fill in all fields with correct values",
                                    "errors (Optional)": [
                                        {
                                            "message": "The email is not correct",
                                            "field": "email",
                                            "value": "johndoe"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                },
                ConflictError: {
                    description: "Invalid data",
                    content: {
                        "application/json":{
                            example: {
                                "error": {
                                    "status": "fail",
                                    "statusCode": 409,
                                    "message": "The email or username is already registered"
                                }
                            }
                        }
                    }
                },
                Unauthorized:{
                    description: "Unauthorized",
                    content: {
                        "application/json":{
                            example:{
                                "error": {
                                    "status": "fail",
                                    "statusCode": 401,
                                    "message": "Invalid token"
                                }
                            }
                        }
                   }
                },
                NotFound: {
                    description: "Resource not found",
                    content:{
                        "application/json":{
                            example:{
                                "error": {
                                    "status": "fail",
                                    "statusCode": 404,
                                    "message": "X record does not exist",
                                }
                            }
                        }
                   }
                },
                InternalServerError: {
                    description:"Internal server error",
                    content:{
                        "application/json":{
                            example:{
                                "error": {
                                    "status": "error",
                                    "statusCode": 500,
                                    "message": "Server error",
                                }
                            }
                        }
                   }
                }
            },
        },
        security: [
            {
                bearerAuth: [], // 🔹 Aplica el esquema de seguridad globalmente
            },
          ],
    },
    apis: ['./src/swagger/*/*.ts'], // Ruta a los archivos donde están definidas las rutas
};

const swaggerSpec = swaggerJSDoc(options);

// Función para usar Swagger en la app
export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

