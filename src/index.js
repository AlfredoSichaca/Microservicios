import express from "express"
import usersRoutes from "./routes/users.routes.js"
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const app = express();

app.use(express.json());
const PORT = process.env.PORT


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Citas',
            version: '1.0.0',
            description: 'Una API para gestionar citas ',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, 
            },
        ],
    },
    apis: ['src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));





app.use("/", usersRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
