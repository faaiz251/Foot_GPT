const generateTrainingPlan = async (position, level) => {
  const prompt = `Generate a personalized football training plan for a ${level} ${position}.`;
  try {
    const result = await model.generateContent(prompt);
    const lines = result.text().split('\n');
    let title = '', description = '', drills = [], duration = 45, difficulty = 'Medium';
    let section = '';
    for (let line of lines) {
      line = line.trim();
      if (line.startsWith('Title:')) title = line.replace('Title:', '').trim();
      else if (line.startsWith('Description:')) description = line.replace('Description:', '').trim();
      else if (line.startsWith('Drills:')) section = 'drills';
      else if (line.startsWith('Duration:')) duration = parseInt(line.replace(/\D/g, '')) || 45;
      else if (line.startsWith('Difficulty:')) difficulty = line.replace('Difficulty:', '').trim();
      else if (section === 'drills' && line.startsWith('-')) drills.push(line.slice(1).trim());
    }
    return { id: new ObjectId().toString(), title, description, drills, duration_minutes: duration, difficulty, position };
  } catch {
    return {
      id: new ObjectId().toString(),
      title: `${position} Training`,
      description: `Training for ${level} ${position}`,
      drills: ['Basic drill 1', 'Basic drill 2'],
      duration_minutes: 45,
      difficulty: 'Medium',
      position,
    };
  }
};

app.post('/api/training/generate', verifyToken, async (req, res) => {
  const user = await db.collection('users').findOne({ id: req.userId });
  if (!user) return res.status(404).json({ detail: 'User not found' });

  const plan = await generateTrainingPlan(user.position, user.experience_level);
  plan.user_id = req.userId;
  await db.collection('training_plans').insertOne(plan);
  res.json(plan);
  }); 

app.get('/api/training/plans', verifyToken, async (req, res) => {
  const plans = await db.collection('training_plans').find({ user_id: req.userId }).toArray();
  res.json(plans);
});

app.post('/api/training/complete', verifyToken, async (req, res) => {
  const { training_plan_id, rating, notes } = req.body;
  const session = {
    id: new ObjectId().toString(),
    user_id: req.userId,
    training_plan_id,
    completed_at: new Date(),
    rating,
    notes,
  };
  await db.collection('training_sessions').insertOne(session);
  res.json({ message: 'Training session recorded' });
});
