import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 animate-gradient-xy opacity-75"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-8 animate-float">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-indigo-900 text-indigo-800 dark:text-indigo-200 px-6 py-3 rounded-2xl backdrop-blur-sm border border-indigo-200/50 dark:border-slate-700/50">
            <CheckCircleIcon className="w-6 h-6" />
            <span className="font-semibold">AI-Powered Career Boost</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-[0.85] drop-shadow-2xl">
            Your
            <br className="md:hidden" />
            <span className="block">Dream</span>
            <br />
            <span>Career</span>
          </h1>
          
          <div className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed opacity-90">
            Upload your resume → <span className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm animate-pulse">AI Insights</span> → Land your dream tech job
          </div>
          
          <Link
            to="/upload"
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-sm border border-indigo-500/20"
          >
            <span className="relative z-10">🚀 Launch My Career</span>
            <ArrowRightIcon className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-75 scale-125 animate-pulse -z-10"></div>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-slate-500 dark:text-slate-400 opacity-80">
            <span>Powered by Grok AI • Trusted by developers</span>
            <div className="w-24 h-px bg-gradient-to-r from-slate-300 to-slate-500 dark:from-slate-600 dark:to-slate-400"></div>
            <span>PDF upload • Instant results</span>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow opacity-60 hidden lg:block"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000 opacity-60 hidden xl:block"></div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything you need. In one place.
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built by developers for developers. Production-grade AI career tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Resume Score',
                desc: 'Get your resume score out of 100 with detailed feedback.',
                icon: '📊'
              },
              {
                title: 'Job Matching',
                desc: 'See which roles match your skills with confidence scores.',
                icon: '🎯'
              },
              {
                title: 'Skill Roadmap',
                desc: 'Personalized learning path to close your skill gaps.',
                icon: '🗺️'
              }
            ].map((feature, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-200 group">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
