import express from "express";
import path from "node:path";
import { __rootDir } from "../app.js";
import {
    renderHome,
    renderAbout,
    renderUpload,
} from "../controllers/pages.controller.js";

const router = express.Router();

router.get("/", renderHome);
router.get("/about", renderAbout);
router.get("/upload", renderUpload);

export default router;

