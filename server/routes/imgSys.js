import express from "express";
import { getImageFile } from "../controllers/imgSys.js";

const router = express.Router();

// Handle GET requests for audio files
router.get("/get/:filename", getImageFile);

export default router;
