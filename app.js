import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import uploadRouter from './routes/upload.js';
import connectDB from "./database/db.js";

connectDB();

const app = express();
const PORT = 3000;
const hostname = `0.0.0.0`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const __rootDir = __dirname;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/upload", uploadRouter);

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "views" , "index.html"));
})
app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname, "views" , "about.html"));
})

app.listen(PORT , hostname ,  () => {
    console.log(`Server running on ${PORT}`);
})