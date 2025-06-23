import express from "express";
import { authenticateUser } from "../middleware/authmiddleware.js";
import User from "../model/user.js";

const router = express.Router();

router.get("/me", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: err.message });
  }
});


export default router;