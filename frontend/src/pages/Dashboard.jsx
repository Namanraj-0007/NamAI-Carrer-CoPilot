import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAnalysis } from '../store/AnalysisContext';
import DashboardCard from '../components/DashboardCard';
import SkillChart from '../components/SkillChart';
import JobMatchList from '../components/JobMatchList';
import Roadmap from '../components/Roadmap';
import Chatbot from '../components/Chatbot';
import { 
  ArrowLeftIcon, 
  ChartBarIcon,
  LightBulbIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { getJobMatches } from '../services/api';

export default function Dashboard() {
  const { state, dispatch } = useAnalysis();
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!state.jobMatches.length) {
      getJobMatches()
        .then(data => dispatch({ type: 'JOB_MATCHES_SUCCESS', payload: data.matches }))
        .catch(() => {});
    }
  }, []);

  if (!state.analysis) {
    return (
      <div className="text-center py-24">
        <ChartBarIcon className="w-24 h-24 text-slate-400 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-slate-900 mb-4">No analysis found</h1>
        <p className="text-xl text-slate-600 mb-8">Upload your resume to get started</p>
        <Link 
          to="/upload" 
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-2xl hover:bg-primary-700 transition-all font-semibold"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Upload Resume
        </Link>
      </div>
    );
  }

  const analysis = state.analysis || {};
  const score = analysis.resume_score || 0;
  const extractedSkills = analysis.skills || [];
  const missingSkills = analysis.missing_skills || [];
  const domain = analysis.domain || 'N/A';
  const experience_level = analysis.experience_level || 'N/A';
  const recommended_roles = analysis.recommended_roles || [];
  const suggestions = analysis.suggestions || '';
  const roadmap = analysis.roadmap || [];
  const jobMatches = analysis.jobMatches || [];
  const strengths = analysis.strengths || [];
  const weaknesses = analysis.weaknesses || [];
  const ats_tips = analysis.ats_tips || [];
  const bullet_rewrites = analysis.bullet_rewrites || [];

  return (
    <div className="min-h-screen">
      <div className="relative mb-16 pt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-slate-900/50 dark:via-slate-800/40 dark:to-indigo-950/60 blur-xl opacity-75 -z-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link 
            to="/upload"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold mb-8 backdrop-blur-sm px-4 py-2 rounded-xl group transition-all hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            New Analysis
          </Link>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent mb-6 drop-shadow-2xl leading-tight">
            Your
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed opacity-90">
            AI-powered insights • Skill roadmap • Job matches • Career acceleration
          </p>
        </div>
      </div>

      {/* Score & Core Cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <DashboardCard title="Resume Score" value={`${score}/100`} icon="⭐">
          <div className="w-full bg-gradient-to-r from-slate-200 to-blue-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full shadow-lg"
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>
        </DashboardCard>

        <DashboardCard title="Domain" value={domain} icon="🏢">
          <p className="text-slate-600">Career focus</p>
        </DashboardCard>

        <DashboardCard title="Experience" value={experience_level} icon="📈">
          <p className="text-slate-600">Stage detected</p>
        </DashboardCard>

        <DashboardCard title="Skills Found" value={extractedSkills.length} icon="🛠️">
          <div className="flex flex-wrap gap-1 mt-2">
            {extractedSkills.slice(0, 6).map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Skill Gaps" value={missingSkills.length} icon="🎯">
          <div className="flex flex-wrap gap-1 mt-2">
            {missingSkills.slice(0, 4).map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Recommended Roles" value={recommended_roles.length} icon="💼">
          <div className="flex flex-wrap gap-1 mt-2">
            {recommended_roles.slice(0, 3).map((role, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {role}
              </span>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Strengths" value={strengths.length} icon="✅">
          <div className="mt-2 space-y-1">
            {strengths.slice(0, 3).map((s, i) => (
              <div key={i} className="text-xs bg-green-100 text-green-800 p-2 rounded">
                {s}
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Weaknesses" value={weaknesses.length} icon="⚠️">
          <div className="mt-2 space-y-1">
            {weaknesses.slice(0, 3).map((w, i) => (
              <div key={i} className="text-xs bg-yellow-100 text-yellow-800 p-2 rounded">
                {w}
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <SkillChart extractedSkills={extractedSkills} missingSkills={missingSkills} />
        <JobMatchList matches={jobMatches} />
      </div>

      {/* Roadmap & Detailed Insights */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Roadmap roadmap={roadmap} />
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-200 space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <LightBulbIcon className="w-12 h-12 text-amber-400" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900">AI Career Insights</h3>
              <p className="text-slate-600">Suggestions, ATS, rewrites</p>
            </div>
          </div>
          {suggestions && (
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Quick Tips</h4>
              <p className="text-lg whitespace-pre-wrap">{suggestions}</p>
            </div>
          )}
          {ats_tips.length > 0 && (
            <div>
              <h4 className="font-bold text-orange-600 mb-3">📋 ATS Tips</h4>
              <ul className="space-y-1">
                {ats_tips.map((tip, i) => (
                  <li key={i} className="p-2 bg-orange-50 rounded text-sm">{tip}</li>
                ))}
              </ul>
            </div>
          )}
          {bullet_rewrites.length > 0 && (
            <div>
              <h4 className="font-bold text-indigo-600 mb-3">✏️ Bullet Rewrites</h4>
              {bullet_rewrites.slice(0, 3).map((rw, i) => (
                <div key={i} className="mb-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                  <div className="text-xs opacity-75 mb-2">Original: <code>{rw.original}</code></div>
                  <div><strong>Improved:</strong> <code>{rw.improved}</code></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Toggle */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => setChatOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center transition-all hover:scale-110 z-40"
        >
          <ChatBubbleLeftIcon className="w-8 h-8" />
        </button>
      </div>
      {chatOpen && (
        <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      )}
    </div>
  );
}
