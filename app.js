import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = 3000;
const hostname = `0.0.0.0`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "views" , "index.html"));
})
app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname, "views" , "about.html"));
})

app.listen(PORT , hostname ,  () => {
    console.log(`Server running on ${PORT}`);
})