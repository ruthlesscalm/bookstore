import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pagesRouter from "./routes/pages.routes.js";
import connectDB from "./database/db.js";
import booksRouter from "./routes/books.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT;
const hostname = process.env.HOSTNAME;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const __rootDir = __dirname;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(pagesRouter);
app.use("/api/books", booksRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, hostname, () => {
    console.log(`Server running on ${PORT}`);
});

