import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function SkillChart({ extractedSkills, missingSkills }) {
  const data = [
    { name: 'Your Skills', value: extractedSkills.length || 0, fill: '#10b981' },
    { name: 'Missing Skills', value: missingSkills.length || 0, fill: '#f59e0b' },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Skills Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            data={data} 
            cx="50%" 
            cy="50%" 
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {total > 0 && (
        <div className="text-center mt-4">
          <p className="text-2xl font-bold text-slate-900">{total} total skills analyzed</p>
        </div>
      )}
    </div>
  );
}
