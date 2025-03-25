import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import myConnection from "./Database/dbconnection.js";
 import customerRoute from './Modules/User/user.route.js';
import examRoute from './Modules/Exams/exam.route.js';
import path from "path";
import { fileURLToPath } from "url";
import migrationRoutes from './Modules/service/migration.route.js';


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    exposedHeaders: ['Content-Type', 'Authorization', 'token']
  }));
  app.use('/api', migrationRoutes);
  app.use('/api/users', customerRoute);
  app.use('/api/exams', examRoute);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

myConnection;

const PORT = process.env.PORT || 3030;
app.listen(3030, function(){
    console.log("Server is running on port 3030");
});