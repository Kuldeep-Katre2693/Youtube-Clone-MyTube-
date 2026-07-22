import express from "express";
import { createWatchParty, joinWatchParty, getWatchParty, } from "../controllers/watchParty.js";

const router = express.Router();

router.post("/create", createWatchParty);
router.post("/join", joinWatchParty);
router.get("/:partyCode", getWatchParty);

export default router;