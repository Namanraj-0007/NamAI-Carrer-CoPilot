export default function DashboardCard({ title, value, icon, children }) {
  return (
    <div className="group relative backdrop-blur-xl bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 rounded-[2.5rem] p-10 shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(99,102,241,0.3)] transition-all duration-700 border border-white/20 dark:border-slate-700/50 hover:border-indigo-400/50 hover:-translate-y-2 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
      <div className="relative flex items-center justify-between mb-8">
        <div className="p-5 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-slate-700/50 dark:to-indigo-900/30 rounded-3xl group-hover:from-indigo-200/70 group-hover:to-purple-200/70 dark:group-hover:from-slate-600/60 dark:group-hover:to-indigo-800/40 backdrop-blur-sm shadow-lg border border-indigo-200/30 dark:border-slate-600/50 transition-all duration-500 hover:rotate-3 hover:scale-110">
          <span className="text-3xl drop-shadow-lg">{icon}</span>
        </div>
        <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent drop-shadow-xl">
          {value}
        </div>
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent mb-4 drop-shadow-md leading-tight">{title}</h3>
      <div className="text-slate-700 dark:text-slate-300 opacity-95">
        {children}
      </div>
    </div>
  );
}
