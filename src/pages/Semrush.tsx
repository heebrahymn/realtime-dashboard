import { useState, useRef, useEffect } from 'react';
import {
  useSemrushOverviewQuery,
  useSemrushTrendsQuery,
  useSemrushKeywordsQuery,
  useSemrushCompetitorsQuery,
  useSemrushSearchQuery,
} from '../features/semrush/hooks/useSemrushData';
import { Search, ChevronDown, Check, Loader2, Activity } from 'lucide-react';
import { DomainOverview } from '../features/semrush/components/DomainOverview';
import { OrganicTrafficTrend } from '../features/semrush/components/OrganicTrafficTrend';
import { CompetitorComparison } from '../features/semrush/components/CompetitorComparison';
import { KeywordOpportunities } from '../features/semrush/components/KeywordOpportunities';

export const Semrush = () => {
  const [domain, setDomain] = useState<string>('amazon.com');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: profile, isLoading: isProfileLoading } = useSemrushOverviewQuery(domain);
  const { data: trends, isLoading: isTrendsLoading } = useSemrushTrendsQuery(domain);
  const { data: keywords, isLoading: isKeywordsLoading } = useSemrushKeywordsQuery(domain);
  const { data: competitors, isLoading: isCompetitorsLoading } = useSemrushCompetitorsQuery(domain);
  const { data: searchResults } = useSemrushSearchQuery(searchQuery);

  const isLoading = isProfileLoading || isTrendsLoading || isKeywordsLoading || isCompetitorsLoading;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectDomain = (id: string) => {
    setDomain(id);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const popularDomains = [
    { id: 'amazon.com', label: 'Amazon' },
    { id: 'jumia.com.ng', label: 'Jumia NG' },
    { id: 'techcabal.com', label: 'TechCabal' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="bg-surface border border-neutral-light rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-orange-500 font-bold block">
            SEO & Competitor Analysis
          </span>
          <h2 className="text-base font-display font-bold text-text-primary">
            Semrush Domain Explorer
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full md:w-auto relative">
          <div ref={dropdownRef} className="relative flex-1 sm:w-80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search domain (e.g. apple.com)..."
                className="w-full pl-10 pr-10 py-2 border border-neutral-light rounded-lg text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-orange-500 bg-surface transition-shadow shadow-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {isDropdownOpen && searchResults && (
              <div className="absolute left-0 right-0 mt-1.5 bg-surface/95 backdrop-blur-md border border-neutral-light rounded-lg shadow-card z-50 overflow-hidden divide-y divide-neutral-light/50">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-xs font-mono text-text-secondary text-center">
                    No domains found
                  </div>
                ) : (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectDomain(result.id)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-neutral-light/50 transition-colors cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-display font-bold text-text-primary group-hover:text-orange-500 transition-colors truncate">
                          {result.domain}
                        </p>
                        <p className="text-[10px] text-text-secondary truncate">{result.category}</p>
                      </div>
                      {domain === result.id && <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {popularDomains.map((pop) => (
              <button
                key={pop.id}
                onClick={() => selectDomain(pop.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  domain === pop.id
                    ? 'bg-orange-500/10 text-orange-600 border-orange-500/20 shadow-sm'
                    : 'bg-surface hover:bg-neutral-light/65 text-text-secondary border-neutral-light'
                }`}
              >
                {pop.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          <p className="text-sm font-mono text-text-secondary">Analyzing SEO metrics...</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {profile && <DomainOverview key={`overview-${domain}`} profile={profile} />}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trends && <OrganicTrafficTrend key={`trends-${domain}`} trends={trends} />}
            {competitors && profile && <CompetitorComparison key={`comp-${domain}`} competitors={competitors} mainDomain={profile} />}
          </div>

          {keywords && <KeywordOpportunities key={`keywords-${domain}`} keywords={keywords} />}
        </div>
      )}
    </div>
  );
};

export default Semrush;
