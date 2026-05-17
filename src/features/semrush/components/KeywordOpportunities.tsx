import type { TopKeyword } from '../api/mockData';

interface KeywordOpportunitiesProps {
  keywords: TopKeyword[];
}

export const KeywordOpportunities = ({ keywords }: KeywordOpportunitiesProps) => {
  return (
    <div className="bg-surface border border-neutral-light rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-neutral-light flex items-center justify-between">
        <div>
          <h3 className="text-sm font-display font-bold text-text-primary">Top Organic Keywords</h3>
          <p className="text-xs text-text-secondary mt-0.5">Highest ranking search terms by volume</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-light/30">
              <th className="py-3 px-5 text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider border-b border-neutral-light">Keyword</th>
              <th className="py-3 px-5 text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider border-b border-neutral-light">Intent</th>
              <th className="py-3 px-5 text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider border-b border-neutral-light">Pos</th>
              <th className="py-3 px-5 text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider border-b border-neutral-light">Volume</th>
              <th className="py-3 px-5 text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider border-b border-neutral-light">KD %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-light">
            {keywords.map((kw) => (
              <tr key={kw.id} className="hover:bg-neutral-light/20 transition-colors">
                <td className="py-3 px-5">
                  <span className="text-sm font-medium text-text-primary">{kw.keyword}</span>
                </td>
                <td className="py-3 px-5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    kw.intent === 'Informational' ? 'bg-blue-500/10 text-blue-600' :
                    kw.intent === 'Commercial' ? 'bg-orange-500/10 text-orange-600' :
                    kw.intent === 'Transactional' ? 'bg-emerald-500/10 text-emerald-600' :
                    'bg-purple-500/10 text-purple-600'
                  }`}>
                    {kw.intent.charAt(0)}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className="text-sm font-mono font-medium text-text-primary">{kw.position}</span>
                </td>
                <td className="py-3 px-5">
                  <span className="text-sm text-text-secondary">{kw.volume.toLocaleString()}</span>
                </td>
                <td className="py-3 px-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary w-6">{kw.kd}</span>
                    <div className="w-16 h-1.5 bg-neutral-light rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${kw.kd > 70 ? 'bg-red-500' : kw.kd > 40 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                        style={{ width: `${kw.kd}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
