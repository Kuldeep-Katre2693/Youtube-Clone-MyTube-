import express from "express";
import { downloadVideo } from "../controllers/download.js";

const router = express.Router();

router.post("/", downloadVideo);

export default router;