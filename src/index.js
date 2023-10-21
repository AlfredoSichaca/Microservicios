import express from "express";
import usersRoutes from "./routes/users.routes.js";
import 'dotenv/config'


const PORT = process.env.PORT

const app = express();

app.use(express.json());

app.use("/", usersRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
