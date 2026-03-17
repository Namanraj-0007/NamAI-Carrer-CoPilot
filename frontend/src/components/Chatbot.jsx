import { useState, useRef, useEffect } from 'react';
import { useAnalysis } from '../store/AnalysisContext';
import { sendChatMessage } from '../services/api';
import { 
  PaperAirplaneIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! **AI Career Copilot** here - your personal tech career mentor. Upload a resume for detailed review (strengths, ATS tips, bullet rewrites), career roadmaps, interview prep. How can I help? 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { state } = useAnalysis();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInput('');

    try {
      const response = await sendChatMessage(input, state.analysis, messages.slice(0, -1));
      setMessages(prev => [...prev, response]);
    } catch (error) {
      const errorMsg = error.response?.data?.content || error.message || 'Sorry, something went wrong. Try again!';
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMsg 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-200 z-50 backdrop-blur-sm">
      <div className="p-6 border-b border-slate-200 rounded-t-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">**AI Career Copilot**</h3>
            <p className="text-sm text-slate-500">{state.analysis ? 'Resume loaded' : 'Ready to help'}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <XMarkIcon className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-900'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about careers, interviews, skills..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          **Groq AI powered** - Harsh's Career Copilot 🚀
        </p>
      </div>
    </div>
  );
}
