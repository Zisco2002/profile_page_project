import express, { text } from 'express';
import apiRoutes from './routes/api.route.js';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js";
import cors from "cors";

// CONFIGURATIONS
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/api", apiRoutes);



// FILE STORAGE
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null , "public/assets");
//     },
//     filename: function(req, file, cb){
//         cb(null, file.originalname);
//     }
// })
// const upload = multer(storage);

// app.post("/api/auth/register" , upload.single("picture") , register)

const PORT=3001

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})