import type { TrafficTrend } from '../api/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OrganicTrafficTrendProps {
  trends: TrafficTrend[];
}

export const OrganicTrafficTrend = ({ trends }: OrganicTrafficTrendProps) => {
  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-display font-bold text-text-primary">12-Month Traffic Trend</h3>
          <p className="text-xs text-text-secondary mt-1">Organic vs Paid traffic comparison</p>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" opacity={0.5} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#6b7280' }} 
              tickFormatter={(value) => value >= 1000000 ? `${(value/1000000).toFixed(1)}M` : `${(value/1000).toFixed(0)}K`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 600 }}
              labelStyle={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="organic" 
              name="Organic Traffic"
              stroke="#f97316" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorOrganic)" 
            />
            <Area 
              type="monotone" 
              dataKey="paid" 
              name="Paid Traffic"
              stroke="#a855f7" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPaid)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
