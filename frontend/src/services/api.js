import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxied to backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Upload helpers
export const uploadResume = async (formData) => {
  const response = await api.post('/uploadResume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const analyzeResume = async (text) => {
  const response = await api.post('/analyzeResume', { text });
  return response.data;
};

export const getJobMatches = async () => {
  const response = await api.get('/jobMatches');
  return response.data;
};

export const sendChatMessage = async (message, analysis, conversation) => {
  const response = await api.post('/chat', { message, resumeAnalysis: analysis, conversation });
  return response.data;
};

export default api;
