import { useState, useRef, useEffect } from 'react';
import {
  useFacebookProfileQuery,
  useFacebookPostsQuery,
  useFacebookAdCampaignsQuery,
  useFacebookDailyReachQuery,
  useFacebookDemographicsQuery,
  useFacebookSearchQuery,
} from '../features/facebook/hooks/useFacebookData';
import { CampaignMonitor } from '../features/facebook/components/CampaignMonitor';
import { PostPerformance } from '../features/facebook/components/PostPerformance';
import { AudienceInsights } from '../features/facebook/components/AudienceInsights';
import { Search, ChevronDown, Check, Loader2, CheckCircle } from 'lucide-react';

export const Facebook = () => {
  const [pageId, setPageId] = useState<string>('techvibe');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // TanStack queries dynamic parameterization
  const { data: profile, isLoading: isProfileLoading } = useFacebookProfileQuery(pageId);
  const { data: posts, isLoading: isPostsLoading } = useFacebookPostsQuery(pageId);
  const { data: campaigns, isLoading: isCampaignsLoading } = useFacebookAdCampaignsQuery(pageId);
  const { data: dailyReach, isLoading: isReachLoading } = useFacebookDailyReachQuery(pageId);
  const { data: demographics, isLoading: isDemographicsLoading } = useFacebookDemographicsQuery(pageId);

  // Search autocomplete query
  const { data: searchResults } = useFacebookSearchQuery(searchQuery);

  const isLoading =
    isProfileLoading || isPostsLoading || isCampaignsLoading || isReachLoading || isDemographicsLoading;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectPage = (id: string) => {
    setPageId(id);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  // Popular quick lookup shortcuts
  const popularPages = [
    { id: 'techvibe', label: 'TechVibe' },
    { id: 'naijafoodies', label: 'Naija Foodies' },
    { id: 'lagosinnovators', label: 'Lagos Innovators' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Dynamic Profile Selector Header */}
      <div className="bg-surface border border-neutral-light rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary block">
            Meta Social Explorer
          </span>
          <h2 className="text-base font-display font-bold text-text-primary">
            Active Feed & Ads Database
          </h2>
        </div>

        {/* Custom Autocomplete Search bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full md:w-auto relative">
          <div ref={dropdownRef} className="relative flex-1 sm:w-80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search page name (e.g. foodies, vibe)..."
                className="w-full pl-10 pr-10 py-2 border border-neutral-light rounded-lg text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary bg-surface transition-shadow shadow-sm"
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

            {/* Dropdown Items list */}
            {isDropdownOpen && searchResults && (
              <div className="absolute left-0 right-0 mt-1.5 bg-surface/95 backdrop-blur-md border border-neutral-light rounded-lg shadow-card z-50 overflow-hidden divide-y divide-neutral-light/50">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-xs font-mono text-text-secondary text-center">
                    No matching profiles found
                  </div>
                ) : (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectPage(result.id)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-neutral-light/50 transition-colors cursor-pointer group"
                    >
                      <img
                        src={result.avatarUrl}
                        alt={result.pageName}
                        className="w-8 h-8 rounded-full object-cover border border-neutral-light"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-display font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                          {result.pageName}
                        </p>
                        <p className="text-[10px] text-text-secondary truncate">{result.category}</p>
                      </div>
                      {pageId === result.id && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Quick chips selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {popularPages.map((pop) => (
              <button
                key={pop.id}
                onClick={() => selectPage(pop.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  pageId === pop.id
                    ? 'bg-primary/10 text-primary border-primary/20 shadow-sm'
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
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm font-mono text-text-secondary">Syncing Meta Social Telemetry...</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Page Profile & Cover Header */}
          <div className="bg-surface border border-neutral-light rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-250">
            {/* Cover Photo */}
            <div className="h-40 relative">
              <img src={profile?.coverUrl} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Profile Details Panel */}
            <div className="p-6 relative flex flex-col md:flex-row items-center md:items-end justify-between gap-6 -mt-10">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-5 relative z-10">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface shadow-md">
                  <img src={profile?.avatarUrl} alt={profile?.pageName} className="w-full h-full object-cover" />
                </div>

                <div className="text-center md:text-left pb-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                      {profile?.pageName}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/15 shadow-sm">
                      <CheckCircle className="w-3 h-3 text-blue-500 fill-blue-500/10" />
                      Verified Business
                    </span>
                  </div>
                  <p className="text-text-secondary text-[14px] font-body mt-1">
                    {profile?.category} • Engagement Rate:{' '}
                    <span className="font-semibold text-text-primary">{profile?.engagementRate}%</span>
                  </p>
                </div>
              </div>

              {/* Followers / Reach Glass metrics */}
              <div className="flex items-center gap-6 bg-white/70 backdrop-blur-md border border-neutral-light/50 px-5 py-3 rounded-lg shadow-sm">
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary block">
                    Total Likes
                  </span>
                  <span className="text-base font-display font-bold text-text-primary block mt-0.5">
                    {profile?.likes.toLocaleString()}
                  </span>
                </div>
                <div className="w-px h-8 bg-neutral-light" />
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary block">
                    Followers
                  </span>
                  <span className="text-base font-display font-bold text-text-primary block mt-0.5">
                    {profile?.followers.toLocaleString()}
                  </span>
                </div>
                <div className="w-px h-8 bg-neutral-light" />
                <div className="text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary block">
                    Weekly Reach
                  </span>
                  <span className="text-base font-display font-bold text-blue-600 block mt-0.5">
                    {profile?.weeklyReach.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Ad Campaign bidding monitor (using key to reset local status changes on page switch!) */}
            <div className="lg:col-span-5">
              {campaigns && <CampaignMonitor key={pageId} initialCampaigns={campaigns} />}
            </div>

            {/* Right: Reach comparison lines chart */}
            <div className="lg:col-span-7">
              {dailyReach && demographics && (
                <AudienceInsights dailyReach={dailyReach} demographics={demographics} />
              )}
            </div>
          </div>

          {/* Published Post List Feed */}
          {posts && <PostPerformance posts={posts} />}
        </div>
      )}
    </div>
  );
};

export default Facebook;
