# Backend API

## Run
```bash
npm install
cp .env.example .env
npm run dev
```

Endpoints:
- POST /api/uploadResume (multipart PDF)
- POST /api/analyzeResume (JSON {text})
- GET /api/jobMatches
