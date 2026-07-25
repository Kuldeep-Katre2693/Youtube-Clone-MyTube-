import express from "express";
import { createWatchParty, joinWatchParty, getWatchParty, } from "../controllers/watchParty.js";
import { getChatHistory } from "../controllers/watchPartyMessageController.js";

const router = express.Router();

router.post("/create", createWatchParty);
router.post("/join", joinWatchParty);
router.get("/:partyCode", getWatchParty);
router.get(
  "/:partyCode/messages",
  getChatHistory
);

export default router;