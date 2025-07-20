import User from "../model/user.js";
import genAI from "../config/gemini.js";
import { TrainingPlan } from "../model/Trainingplan.js";

// const generateTrainingPlan = async (position, level) => {
//   const prompt = `Generate a personalized football training plan for a ${level} ${position}.`;
//   try {
//      const result = await genAI.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });
//     const lines =  result?.candidates?.[0]?.content?.parts?.[0]?.text;
//     let title = '', description = '', drills = [], duration = 45, difficulty = 'Medium';
//     let section = '';
//     for (let line of lines) {
//       line = line.trim();
//       if (line.startsWith('Title:')) title = line.replace('Title:', '').trim();
//       else if (line.startsWith('Description:')) description = line.replace('Description:', '').trim();
//       else if (line.startsWith('Drills:')) section = 'drills';
//       else if (line.startsWith('Duration:')) duration = parseInt(line.replace(/\D/g, '')) || 45;
//       else if (line.startsWith('Difficulty:')) difficulty = line.replace('Difficulty:', '').trim();
//       else if (section === 'drills' && line.startsWith('-')) drills.push(line.slice(1).trim());
//     }
//     return { id: new ObjectId().toString(), title, description, drills, duration_minutes: duration, difficulty, position };
//   } catch {
//     return {
//       id: new ObjectId().toString(),
//       title: `${position} Training`,
//       description: `Training for ${level} ${position}`,
//       drills: ['Basic drill 1', 'Basic drill 2'],
//       duration_minutes: 45,
//       difficulty: 'Medium',
//       position,
//     };
//   }
// };

export const generateTrainingPlan = async (req, res) => {
  try {
    // Fetch user by ID from the token (assumed to be populated by auth middleware)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ detail: "User not found" });
    }

    // Structured and strict prompt for Gemini
    const prompt = `
You are an AI football training assistant. Based on the user's profile below, generate a structured, high-quality personalized football training plan.

User Profile:
- Position: ${user.position}
- Experience Level: ${user.experience_level}

Your response must follow this exact format:
Title: [One-line training plan title]
Description: [Brief summary of the training goal and focus, 1–2 sentences]
Drills:
- [Drill 1 name and description]
- [Drill 2 name and description]
- [Drill 3 name and description]
Duration: [Number of minutes, e.g. 45]
Difficulty: [Easy, Medium, or Hard]

Instructions:
- Do NOT include any asterisks, quotes, markdown formatting, or extra whitespace.
- Only return the plan in the specified format. No greetings, explanations, or extra text.
- Ensure the drills are tailored specifically to the user's position and experience level.
- Keep language professional and concise.
- All fields (title, description, drills, duration, difficulty) must be present.
`;

    // Call Gemini API
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Extract and split the raw response
    const linesRaw = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const lines = linesRaw.split("\n");
    console.log("Generated content:", linesRaw);

        res.status(200).json({ trainingPlans: lines });


    // Initialize variables
    let title = "", description = "", drills = [], duration = 45, difficulty = "Medium";
    let section = "";

    // Parse lines
    for (let line of lines) {
      line = line.trim();
      if (line.startsWith("Title:")) title = line.replace("Title:", "").trim();
      else if (line.startsWith("Description:")) description = line.replace("Description:", "").trim();
      else if (line.startsWith("Drills:")) section = "drills";
      else if (line.startsWith("Duration:")) {
        const match = line.match(/\d+/);
        duration = match ? parseInt(match[0]) : 45;
      } else if (line.startsWith("Difficulty:")) difficulty = line.replace("Difficulty:", "").trim();
      else if (section === "drills" && line.startsWith("-")) drills.push(line.slice(1).trim());
    }

    // Validate parsed values
    if (!title || !description || drills.length === 0) {
      return res.status(500).json({
        message: "Training Plan generation failed: missing one or more required fields.",
      });
    }

    // Save training plan to DB
    const trainingPlan = new TrainingPlan({
      user: user._id,
      title,
      description,
      drills,
      duration_minutes: duration,
      difficulty,
    });

    await trainingPlan.save();

    // Respond to frontend
    return res.status(200).json({
      message: "Training plan generated successfully",
      trainingPlan: {
        id: trainingPlan._id,
        title,
        description,
        drills,
        duration_minutes: duration,
        difficulty,
      },
    });

  } catch (err) {
    console.error("Training Plan Error:", err);
    return res.status(500).json({
      message: "Failed to generate training plan",
      error: err.message,
    });
  }
};

// app.get('/api/training/plans', verifyToken, async (req, res) => {
//   const plans = await db.collection('training_plans').find({ user_id: req.userId }).toArray();
//   res.json(plans);
// });

// app.post('/api/training/complete', verifyToken, async (req, res) => {
//   const { training_plan_id, rating, notes } = req.body;
//   const session = {
//     id: new ObjectId().toString(),
//     user_id: req.userId,
//     training_plan_id,
//     completed_at: new Date(),
//     rating,
//     notes,
//   };
//   await db.collection('training_sessions').insertOne(session);
//   res.json({ message: 'Training session recorded' });
// });
