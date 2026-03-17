require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const resumeRoutes = require('./routes/resume');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🔑 Gemini AI Ready - Your API key configured!');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

app.use('/api', resumeRoutes);
app.use('/api', chatRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK', ai: 'Gemini 1.5 Flash' }));

app.listen(PORT, () => {
  console.log(`🚀 Backend http://localhost:${PORT}`);
  console.log('🤖 Real Gemini AI analysis enabled');
});
