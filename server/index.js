import express from "express";
import router from "./routes/routes.js";
import connection from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";

import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
const PORT = 8000;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

connection(dbUsername, dbPassword);
app.listen(PORT, console.log(`Server is running at Port ${PORT}`));
