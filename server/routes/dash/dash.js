
import express from "express";
import { authenticateUser } from "../middleware/authmiddleware.js";
import { getUserProfile , getDailyTip } from "../dash-controller/dash_controller.js"
const router = express.Router();

router.get("/profile", authenticateUser , getUserProfile);
router.get("/daily-tip", authenticateUser , getDailyTip);

export default router;