# Harsh's AI Career Copilot 🚀

**AI-Powered Resume Analyzer & Career Copilot** - Upload PDF → Get score, skill gaps, job matches, learning roadmap & personalized advice!

[![Score](https://img.shields.io/badge/Resume%20Score-90%2F100-brightgreen)](https://harsh-ai-career-copilot.vercel.app)

## ✨ Features
| Feature | Description |
|---------|-------------|
| **PDF Upload** | Drag-drop resume → AI extracts skills |
| **Smart Score** | 90/100 accuracy (React/Node/etc) |
| **Skill Charts** | Recharts pie/bar - gaps vs strengths |
| **Job Matches** | Database matching (92% Frontend Dev) |
| **Roadmap** | 4-week skill learning plan |
| **Groq Chat** | Resume-aware career advice |
| **Responsive** | Mobile/Tablet/Desktop |

## 🎯 Live Demo
```
Frontend: http://localhost:5173
Backend: http://localhost:5000/health
```

## 🚀 Quick Start
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Test:** Upload PDF → Dashboard → 85-95 score + AI Career Copilot chat!

## 🛠 Tech Stack
```
Frontend: React 18 + Vite + Tailwind + Recharts + Zustand
Backend: Node + Express + Multer + pdf-parse + Groq API
Deployment: Vercel + Render
```

## 📁 Structure
```
AI-Career-Copilot/
├── backend/     # API + Groq
├── frontend/    # React app
├── README.md    # You are here!
└── TODO.md      # Guide
```

## 🔧 API Endpoints
| Endpoint | Method | Use |
|----------|--------|-----|
| `/api/uploadResume` | POST | PDF upload |
| `/api/analyzeResume` | POST | `{text}` → analysis |
| `/api/chat` | POST | Groq chat |

## 🌟 Why This App?
- Production-grade UI (Tailwind)
- Real AI (Groq - fast/real)
- Portfolio-ready (deploy 5min)
- **Made by Namandip Raj with ❤️**

## 🚀 Deploy
1. **Frontend (Vercel):** GitHub → Import → Deploy
2. **Backend (Render):** New Service → GitHub → `npm start`

**Your resume analyzer LIVE worldwide!**

---
**Made by Namandip Raj with ❤️** - Full-stack AI portfolio project
