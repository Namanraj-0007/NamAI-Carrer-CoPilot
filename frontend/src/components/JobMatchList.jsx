import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  Rectangle 
} from 'recharts';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;
  
  return (
    <g>
      <rect 
        x={x} 
        y={height > 10 ? y : height} 
        width={width} 
        height={height > 10 ? height : 10} 
        fill={fill}
        rx={4}
        className="drop-shadow-lg"
      />
      {height > 30 && (
        <text
          x={x + width / 2}
          y={y - 8}
          textAnchor="middle"
          fill="#1e293b"
          fontSize="12"
          fontWeight="bold"
        >
          {props.payload?.match}%
        </text>
      )}
    </g>
  );
};

export default function JobMatchList({ matches = [] }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <BriefcaseIcon className="w-10 h-10 text-blue-500" />
        <h3 className="text-xl font-semibold text-slate-900">Job Role Matches</h3>
      </div>
      {matches.length === 0 ? (
        <div className="text-center py-12 text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
          <BriefcaseIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <p className="text-xl font-semibold">No job matches yet</p>
          <p className="text-sm mt-2 opacity-75 max-w-md mx-auto">Complete your resume analysis to discover matching job roles from our database</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={matches} layout="vertical">
            <XAxis type="number" hide />
            <YAxis 
              dataKey="role" 
              type="category" 
              width={120}
              tick={{ fontSize: 14, fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
              }}
            />
            <Bar 
              dataKey="match" 
              fill="#3b82f6" 
              maxBarSize={30}
              shape={<CustomBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
