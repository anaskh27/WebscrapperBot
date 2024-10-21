import express from "express";
import { question } from "../controllers/controllers.js";
import { getPrompt, updatePrompt } from "../controllers/prompt.js";

const router = express.Router();

router.post("/query", question);
router.put("/prompt", updatePrompt);
router.get("/prompt", getPrompt);

export default router;
