import type { CompetitorOverlap, SemrushDomainProfile } from '../api/mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CompetitorComparisonProps {
  competitors: CompetitorOverlap[];
  mainDomain: SemrushDomainProfile;
}

export const CompetitorComparison = ({ competitors, mainDomain }: CompetitorComparisonProps) => {
  // Normalize data for Radar chart (0-100 scale)
  const data = [
    {
      subject: 'Authority',
      [mainDomain.domain]: mainDomain.authorityScore,
      [competitors[0]?.domain || 'Comp 1']: competitors[0]?.authorityScore || 0,
      [competitors[1]?.domain || 'Comp 2']: competitors[1]?.authorityScore || 0,
    },
    {
      subject: 'Overlap %',
      [mainDomain.domain]: 100, // Self overlap is 100%
      [competitors[0]?.domain || 'Comp 1']: competitors[0]?.competitionLevel || 0,
      [competitors[1]?.domain || 'Comp 2']: competitors[1]?.competitionLevel || 0,
    },
    {
      subject: 'Keywords',
      [mainDomain.domain]: 100, // Normalized to 100 for visual comparison
      [competitors[0]?.domain || 'Comp 1']: Math.min((competitors[0]?.seKeywords / (competitors[0]?.seKeywords + 10000)) * 100, 100),
      [competitors[1]?.domain || 'Comp 2']: Math.min((competitors[1]?.seKeywords / (competitors[1]?.seKeywords + 10000)) * 100, 100),
    },
  ];

  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-display font-bold text-text-primary">Competitor Positioning Map</h3>
          <p className="text-xs text-text-secondary mt-1">Comparing {mainDomain.domain} with top rivals</p>
        </div>
      </div>
      
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e5e5e5" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip 
              wrapperStyle={{ outline: 'none' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '12px', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            
            <Radar name={mainDomain.domain} dataKey={mainDomain.domain} stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
            {competitors[0] && (
              <Radar name={competitors[0].domain} dataKey={competitors[0].domain} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            )}
            {competitors[1] && (
              <Radar name={competitors[1].domain} dataKey={competitors[1].domain} stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
