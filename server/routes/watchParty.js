import express from "express";
import { createWatchParty, joinWatchParty } from "../controllers/watchParty.js";

const router = express.Router();

router.post("/create", createWatchParty);
router.post("/join", joinWatchParty);

export default router;