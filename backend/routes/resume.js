const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractTextFromPDF } = require('../services/pdfService');
const { analyzeResume } = require('../services/groqService');

const router = express.Router();

// Multer config for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `resume-${Date.now()}.pdf`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// POST /api/uploadResume - Upload and extract text
router.post('/uploadResume', upload.single('resume'), async (req, res) => {
  console.log('📄 Resume upload received:', req.file?.filename);
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const text = await extractTextFromPDF(req.file.path);
    console.log('📖 PDF text length:', text.length);
    fs.unlinkSync(req.file.path);

    res.json({ 
      success: true, 
      text: text.substring(0, 4000),
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('❌ PDF error:', error.message);
    res.status(500).json({ error: 'Failed to process PDF: ' + error.message });
  }
});

// POST /api/analyzeResume - Real AI + smart matching
router.post('/analyzeResume', async (req, res) => {
  console.log('🤖 Sending resume to AI, text length:', req.body.text?.length);
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Resume text required' });
    }

    const analysis = await analyzeResume(text);
    console.log('✅ AI analysis complete:', analysis.domain, analysis.resume_score);
    res.json({ 
      success: true, 
      analysis: {
        domain: analysis.domain,
        skills: analysis.skills,
        resume_score: analysis.resume_score,
        recommended_roles: analysis.recommended_roles,
        missing_skills: analysis.missing_skills,
        strengths: analysis.strengths || [],
        career_suggestions: analysis.career_suggestions || [],
        jobMatches: analysis.jobMatches || [],
        roadmap: analysis.roadmap || [],
        suggestions: analysis.suggestions || analysis.career_suggestions?.join('\n') || 'Great resume! Consider advanced skills.'
      }
    });
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    res.status(500).json({ error: 'Analysis failed: ' + error.message });
  }
});

// DELETE /api/jobMatches (deprecated - now in analysis)
router.get('/jobMatches', (req, res) => {
  res.status(410).json({ error: 'Use /analyzeResume - includes jobMatches' });
});

module.exports = router;
