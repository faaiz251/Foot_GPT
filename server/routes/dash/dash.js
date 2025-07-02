
import express from "express";
import { authenticateUser } from "../middleware/authmiddleware.js";
import { getUserProfile , getDailyTip } from "../dash-controller/dash_controller.js"
import { generateTrainingPlan } from "../training/training.js";
const router = express.Router();

router.get("/profile", authenticateUser , getUserProfile);
router.get("/daily-tip", authenticateUser , getDailyTip);
router.post("/training/generate", authenticateUser, generateTrainingPlan);

export default router;