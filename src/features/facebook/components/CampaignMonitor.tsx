import { useState } from 'react';
import { Play, Pause, Target, AlertCircle } from 'lucide-react';
import type { AdCampaign } from '../api/mockData';

interface CampaignMonitorProps {
  initialCampaigns: AdCampaign[];
}

export const CampaignMonitor = ({ initialCampaigns }: CampaignMonitorProps) => {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(initialCampaigns);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempBudget, setTempBudget] = useState<string>('');

  const toggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c))
    );
  };

  const startEdit = (id: string, currentBudget: number) => {
    setEditingId(id);
    setTempBudget(currentBudget.toString());
  };

  const saveBudget = (id: string) => {
    const val = parseFloat(tempBudget);
    if (!isNaN(val) && val > 0) {
      setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, budget: val } : c)));
      setEditingId(null);
    }
  };

  const adjustBudget = (id: string, amount: number) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, budget: Math.max(c.budget + amount, 500) } : c))
    );
  };

  const activeCount = campaigns.filter((c) => c.status === 'Active').length;
  const totalBudget = campaigns.reduce((acc, c) => (c.status === 'Active' ? acc + c.budget : acc), 0);

  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
              Ads Manager
            </p>
            <h3 className="text-lg font-display font-bold text-text-primary">
              Active Campaigns
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {activeCount} Running
          </div>
        </div>

        {/* Dynamic Aggregated Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-neutral-light/35 p-3 rounded-lg border border-neutral-light/50">
          <div>
            <span className="text-[10px] font-mono text-text-secondary block">
              Daily Active Budget
            </span>
            <span className="text-base font-display font-bold text-text-primary">
              ₦{totalBudget.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-text-secondary block">
              Total Spent (MTD)
            </span>
            <span className="text-base font-display font-bold text-blue-600">
              ₦{campaigns.reduce((acc, c) => acc + c.spent, 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="space-y-4">
          {campaigns.map((camp) => {
            const isEditing = editingId === camp.id;

            return (
              <div
                key={camp.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  camp.status === 'Active'
                    ? 'border-blue-500/15 bg-blue-500/[0.01] hover:bg-blue-500/[0.02]'
                    : 'border-neutral-light bg-neutral-light/10 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h4 className="text-sm font-display font-bold text-text-primary truncate">
                      {camp.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] uppercase font-bold text-text-secondary">
                      <Target className="w-3 h-3 text-blue-500" />
                      {camp.objective}
                    </span>
                  </div>

                  {/* Play/Pause state toggle */}
                  <button
                    onClick={() => toggleStatus(camp.id)}
                    className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                      camp.status === 'Active'
                        ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/15'
                        : 'bg-neutral-light text-text-secondary border-neutral-light hover:bg-neutral-light/80'
                    }`}
                    title={camp.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                  >
                    {camp.status === 'Active' ? (
                      <Pause className="w-3.5 h-3.5 fill-blue-600" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-text-secondary ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Campaign Telemetry details */}
                <div className="grid grid-cols-3 gap-2 my-3 text-[11px] font-mono text-text-secondary">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-text-secondary">CTR</span>
                    <span className="font-bold text-text-primary">{camp.ctr}%</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-text-secondary">Impressions</span>
                    <span className="font-bold text-text-primary">{camp.impressions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-text-secondary">CPR</span>
                    <span className="font-bold text-emerald-600">₦{camp.cpr}</span>
                  </div>
                </div>

                {/* Interactive budget controls */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-light/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-body text-text-secondary">Daily:</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          className="w-16 px-1.5 py-0.5 border border-primary rounded text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                          value={tempBudget}
                          onChange={(e) => setTempBudget(e.target.value)}
                          autoFocus
                        />
                        <button
                          onClick={() => saveBudget(camp.id)}
                          className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-mono font-bold text-text-primary">
                          ₦{camp.budget.toLocaleString()}
                        </span>
                        <button
                          onClick={() => startEdit(camp.id, camp.budget)}
                          className="text-[10px] text-blue-600 hover:underline ml-1 cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Micro adjustments */}
                  {!isEditing && camp.status === 'Active' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => adjustBudget(camp.id, -500)}
                        className="p-1 hover:bg-neutral-light border border-neutral-light text-text-secondary rounded text-[9px] font-bold transition-colors cursor-pointer"
                        title="Reduce budget ₦500"
                      >
                        -500
                      </button>
                      <button
                        onClick={() => adjustBudget(camp.id, 1000)}
                        className="p-1 hover:bg-neutral-light border border-neutral-light text-text-secondary rounded text-[9px] font-bold transition-colors cursor-pointer"
                        title="Increase budget ₦1000"
                      >
                        +1K
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-text-secondary bg-neutral-light/20 p-2.5 rounded-lg border border-neutral-light/30">
        <AlertCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
        <span>Budgets represent simulated Meta Ads daily bids. Changes reflect in real-time reach estimates.</span>
      </div>
    </div>
  );
};
