import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/activities.route.s/index.js";
import { createPost } from  "./controllers/posts.js";
import {register} from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null , "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer(storage);

app.post("/api/register" , upload.single("picture") , register)
// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// POSTGRES SETUP
const PORT = process.env.Port || 6001;

// Create a new PostgreSQL client instance and pass the connection string in the dotenv file to it
const {Client} = pkg;
const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });
  
  // Connect to the PostgreSQL database
client.connect()
    // if connection goes well
    .then(() => {
        console.log('Connected to PostgreSQL database');
        // Start your server or perform other operations here
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    }) // if there is an error
    .catch(error => {
        console.error('Error connecting to PostgreSQL database:', error);
    });
