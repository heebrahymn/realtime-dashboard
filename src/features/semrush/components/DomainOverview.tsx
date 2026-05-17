import type { SemrushDomainProfile } from '../api/mockData';
import { Target, TrendingUp, Link, Users } from 'lucide-react';

interface DomainOverviewProps {
  profile: SemrushDomainProfile;
}

export const DomainOverview = ({ profile }: DomainOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Authority Score */}
      <div className="bg-surface border border-neutral-light rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/5 rounded-full blur-xl" />
        <div className="flex items-center justify-between mb-3 relative z-10">
          <span className="text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider">Authority Score</span>
          <Target className="w-4 h-4 text-orange-500" />
        </div>
        <div className="flex items-baseline gap-2 relative z-10">
          <span className="text-3xl font-display font-bold text-text-primary">{profile.authorityScore}</span>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">
            Top 10%
          </span>
        </div>
      </div>

      {/* Organic Traffic */}
      <div className="bg-surface border border-neutral-light rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider">Organic Traffic</span>
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-text-primary">
            {profile.organicTraffic >= 1000000 
              ? (profile.organicTraffic / 1000000).toFixed(1) + 'M' 
              : (profile.organicTraffic / 1000).toFixed(1) + 'K'}
          </span>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">
            +12.5%
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1">Monthly visits from Search</p>
      </div>

      {/* Backlinks */}
      <div className="bg-surface border border-neutral-light rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider">Backlinks</span>
          <Link className="w-4 h-4 text-blue-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-text-primary">
            {profile.backlinks >= 1000000 
              ? (profile.backlinks / 1000000).toFixed(1) + 'M' 
              : (profile.backlinks / 1000).toFixed(1) + 'K'}
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1">From {profile.referringDomains.toLocaleString()} referring domains</p>
      </div>

      {/* Paid Traffic */}
      <div className="bg-surface border border-neutral-light rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider">Paid Traffic</span>
          <Users className="w-4 h-4 text-purple-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-text-primary">
            {profile.paidTraffic >= 1000000 
              ? (profile.paidTraffic / 1000000).toFixed(1) + 'M' 
              : (profile.paidTraffic / 1000).toFixed(1) + 'K'}
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1">Monthly visits from Paid Search</p>
      </div>
    </div>
  );
};
