export default function Roadmap({ roadmap }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200 shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
        📈 Learning Roadmap
        <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full text-sm font-medium">
          {roadmap.length} weeks
        </span>
      </h3>
      
      <div className="space-y-4">
        {roadmap.map((week, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 hover:shadow-md transition-all">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {index + 1}
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">{week}</p>
            </div>
          </div>
        ))}
        {roadmap.length === 0 && (
          <p className="text-center py-12 text-slate-500 text-lg">Analysis will generate your personalized roadmap</p>
        )}
      </div>
    </div>
  );
}
