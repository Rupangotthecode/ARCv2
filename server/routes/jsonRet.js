import express from "express";
import { retrieveDBJson } from "../controllers/jsonRet.js";

const router = express.Router();

router.get("/get/:testType/:content", retrieveDBJson);

export default router;
