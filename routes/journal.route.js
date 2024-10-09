import express from "express";
import { journalEntry } from "../controllers/journal.controller.js";

export const journalRouter = express.Router()

journalRouter.post("/addJournalEntry", journalEntry)
journalRouter.get("/getJournalEntry", journalEntry)
journalRouter.get("/getJournalEntryById/:journalId", journalEntry)
journalRouter.put("/updateJournalEntry/:journalId", journalEntry)