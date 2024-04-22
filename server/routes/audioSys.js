import express from "express";
import { getAudioFile } from "../controllers/audioSys.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

// Handle GET requests for audio files
router.get("/get/:filename", getAudioFile);

export default router;
