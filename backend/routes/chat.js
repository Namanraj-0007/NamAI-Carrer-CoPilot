const express = require('express');
const { chatResponse } = require('../services/groqService');

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, resumeAnalysis, conversation } = req.body;
    const response = await chatResponse(message, resumeAnalysis, conversation || []);
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ 
      role: 'assistant', 
content: 'Sorry, chat service issue. Ensure GROQ_API_KEY in backend/.env and try again.' 
    });
  }
});

module.exports = router;
