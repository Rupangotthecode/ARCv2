import express from "express";
import {
  changeVolume,
  login,
  parentQuesSubmit,
  signup,
} from "../controllers/auth.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/PQsubmit", auth, parentQuesSubmit);
router.post("/changeVolume", changeVolume);

export default router;
