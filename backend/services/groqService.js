const OpenAI = require('openai');
const { getAllRelevantMatches } = require('./jobMatcher');

let groq;

async function getAPIKey() {
  const key = process.env.GROQ_API_KEY;
  return key || null;
}

const ANALYSIS_PROMPT = `
You are **AI Career Copilot**, expert tech resume reviewer & career mentor.

Analyze resume → Return **ONLY valid JSON**.

{
  "domain": "Frontend Development",
  "skills": ["react"],
  "experience_level": "Mid",
  "recommended_roles": ["Frontend Developer"],
  "resume_score": 85,
  "strengths": ["Good React knowledge"],
  "weaknesses": ["No TypeScript"],
  "missing_skills": ["typescript"],
  "ats_tips": ["Add React, TypeScript keywords"],
  "bullet_rewrites": [
    {"original": "Made app", "improved": "Developed React app with 100+ users"}
  ],
  "career_suggestions": ["Learn TypeScript"]
}

Resume: {{TEXT}}
`;

async function analyzeResume(resumeText) {
  const apiKey = await getAPIKey();
  if (apiKey) {
    try {
      if (!groq) {
        groq = new OpenAI({
          apiKey,
          baseURL: 'https://api.groq.com/openai/v1',
        });
      }
      const prompt = ANALYSIS_PROMPT.replace('{{TEXT}}', resumeText.substring(0, 16000));
      const completion = await groq.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
      });
      const content = completion.choices[0].message.content.trim().replace(/```json|```/g, '').trim();
      const analysis = JSON.parse(content);
      analysis.jobMatches = getAllRelevantMatches(analysis.skills, analysis.domain);
      return analysis;
    } catch (error) {
      console.error('Groq analysis failed:', error.message);
    }
  }
  return require('./mockFallback').analyzeResume(resumeText);
}

const CHAT_SYSTEM_PROMPT = `You are **AI Career Copilot** - resume-focused tech mentor.

**Always**:
- 150-250 words
- **Headings**: Explanation, Key Insights, Step-by-Step, Actionable Suggestions
- Reference resume analysis
- ATS tips, bullet improvements
- Encouraging

Resume: {{ANALYSIS}}

User: {{MESSAGE}}

Respond with headings/lists.`;

async function chatResponse(message, resumeAnalysis, conversationHistory = []) {
  const apiKey = await getAPIKey();
  if (apiKey) {
    try {
      if (!groq) {
        groq = new OpenAI({
          apiKey,
          baseURL: 'https://api.groq.com/openai/v1',
        });
      }
      const historyText = conversationHistory.slice(-8).map(msg => msg.role + ': ' + msg.content).join('\\n');
      const analysisText = resumeAnalysis ? JSON.stringify(resumeAnalysis, null, 2) : 'No resume - upload for personalized help';
      const prompt = CHAT_SYSTEM_PROMPT
        .replace('{{ANALYSIS}}', analysisText.substring(0, 2000))
        .replace('{{MESSAGE}}', message);
      const messages = [
        { role: "system", content: "Resume-focused career coach. Bold headings, numbered steps, ATS focus." },
        { role: "user", content: prompt }
      ];
      const completion = await groq.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      });
      return { role: 'assistant', content: completion.choices[0].message.content.trim() };
    } catch (error) {
      console.error('Groq chat failed:', error);
    }
  }
  // Resume-focused fallback
  const fallback = `**AI Career Copilot - Resume Helper**

**Explanation**: Need your resume uploaded for personalized review. General resume advice below.

**Key Insights**:
- Quantify achievements (users/revenue/time saved)
- ATS keywords (React, Node.js, AWS)
- STAR format (Situation/Task/Action/Result)

**Step-by-Step Resume Fix**:
1. Upload PDF here
2. Review dashboard (strengths/gaps/ATS)
3. Rewrite bullets: "Coded site" → "Built responsive React site (2 weeks, 5k users)"

**Suggestions**:
- freeCodeCamp Resume Guide
- GitHub portfolio
- LeetCode for interviews

Upload resume now! 🚀`;
  return { role: 'assistant', content: fallback };
}

module.exports = { analyzeResume, chatResponse };
