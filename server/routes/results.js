import express from "express";
import {
  getAllResults,
  getResultWithId,
  submitResults,
} from "../controllers/results.js";

const router = express.Router();

router.post("/submit", submitResults);
router.get("/getresult/:resultId", getResultWithId);
router.get("/getAllresults/:userId", getAllResults);

export default router;
