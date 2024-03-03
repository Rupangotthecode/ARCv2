import express from "express";
import { getResultWithId, submitResults } from "../controllers/results.js";

const router = express.Router();

router.post("/submit", submitResults);
router.get("/getresult/:resultId", getResultWithId);

export default router;
