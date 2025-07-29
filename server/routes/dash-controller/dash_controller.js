import User from "../model/user.js";
import genAI from "../config/gemini.js";
import { TrainingPlan } from "../model/Trainingplan.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // const sessionsCount = await TrainingSession.countDocuments({ user_id: req.user._id });
    const plansCount = await TrainingPlan.countDocuments({ user_id: req.user._id });

    res.json({
      user,
      stats: {
        // total_training_sessions: sessionsCount,
        total_training_plans: plansCount,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ detail: "Failed to fetch user profile", error: err.message });
  }
};

export const getDailyTip = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

   const prompt = `
You are an AI football coach assistant. Based on the user's profile below, generate a daily motivational tip and quote specifically for them.

User Profile:
- Position: ${user.position}
- Experience Level: ${user.experience_level}

Your response must include both:
1. A **practical football tip** tailored to the user's position and experience level. It should be realistic, relevant, and written in 1–2 concise sentences.
2. A **motivational quote** related to football, training, or sports mentality. It must be relevant and inspiring.

Formatting Instructions:
- Use this **exact format**:
Tip: [Your tip here]
Quote: [Your motivational quote here]

Strict Rules:
- Do NOT include asterisks, quotes, or markdown symbols.
- Do NOT include extra headers, titles, or explanations.
- Do NOT return any greetings or closing remarks.
- Avoid overly generic advice. Make the tip specific to the user's role and skill level.
- Avoid repeating words like "Remember," "Always," or "As a player" unless necessary for clarity.

Be concise, insightful, and structured. Only output the formatted content.
`;


    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const content = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      return res.status(500).json({ message: "Failed to generate content" });
    }
    console.log("Generated content:", content);
    let tip = "";
    let quote = "";
    content.split("\n").forEach((line) => {
      if (line.startsWith("Tip:")) {
        tip = line.replace("Tip:", "").trim();
      } else if (line.startsWith("Quote:")) {
        quote = line.replace("Quote:", "").trim();
      }
    });

    console.log("Extracted tip:", tip);
    console.log("Extracted quote:", quote);
    // if (!tip) tip = 'Focus on your first touch today - it sets up everything that follows.';
    // if (!quote) quote = 'Success is where preparation and opportunity meet.';
    if (!tip || !quote) {
      return res
        .status(500)
        .json({ message: "Failed to generate tip or quote" });
    }

    res.json({ tip, motivational_quote: quote });
  } catch (err) {
    res.status(500).json({
      message: "Failed to generate question",
      error: err.message,
    });
  }
};
