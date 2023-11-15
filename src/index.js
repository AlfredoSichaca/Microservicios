import express from "express"
import usersRoutes from "./routes/users.routes.js"
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import cors from 'cors';


const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // o específica la URL permitida
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
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
