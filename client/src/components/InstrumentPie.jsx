import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { byInstrument } from '../utils/stats';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899'];

export default function InstrumentPie({ sessions }) {
  const data = byInstrument(sessions);

  return (
    <div className="card">
      <h2>Where my practice time goes</h2>

      {data.length === 0 ? (
        <p>Add a session to see your chart.</p>
      ) : (
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="minutes"
                nameKey="name"
                innerRadius={70}
                outerRadius={120}
                label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
              >
                {data.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} min`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}