import { useState } from 'react';
import { useGithubUserQuery, useGithubReposQuery } from '../features/github/hooks/useGithubData';
import { GithubProfile } from '../features/github/components/GithubProfile';
import { GithubRepos } from '../features/github/components/GithubRepos';
import { Search } from 'lucide-react';

const PRESETS = ['heebrahymn', 'gaearon', 'yyx990803'];

export const Github = () => {
  const [username, setUsername] = useState('heebrahymn');
  const [inputValue, setInputValue] = useState('');

  const { data: user, isLoading: loadingUser, error: userError } = useGithubUserQuery(username);
  const { data: repos, isLoading: loadingRepos, error: reposError } = useGithubReposQuery(username);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
            Open Source Telemetry
          </span>
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight mb-2">
            GitHub Insights
          </h1>
          <p className="text-text-secondary text-[15px] font-body">
            Realtime repository metrics, active codebases, and profile telemetry.
          </p>
        </div>

        {/* Dynamic Search Box */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-80">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search developer username..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-md bg-surface text-text-primary font-body text-sm focus:outline-none focus:border-primary transition-all duration-150"
            />
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md font-medium text-sm hover:bg-primary-hover active:translate-y-0.5 transition-all duration-150 cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Preset tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-light pb-4">
        {PRESETS.map((userPreset) => {
          const isActive = username.toLowerCase() === userPreset.toLowerCase();
          return (
            <button
              key={userPreset}
              onClick={() => {
                setUsername(userPreset);
                setInputValue('');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-surface border border-neutral-light text-text-secondary hover:border-text-secondary'
              }`}
            >
              @{userPreset}
            </button>
          );
        })}
      </div>

      {/* Github Output */}
      {loadingUser || loadingRepos ? (
        <div className="space-y-8 animate-pulse">
          <div className="w-full h-36 bg-surface border border-neutral-light rounded-xl"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-32 bg-surface border border-neutral-light rounded-xl"></div>
            ))}
          </div>
        </div>
      ) : userError || reposError || !user || !repos ? (
        <div className="bg-surface border border-neutral-light rounded-xl p-8 text-center text-text-secondary">
          Could not find GitHub telemetry for username "{username}". Please verify spelling.
        </div>
      ) : (
        <div className="space-y-8">
          <GithubProfile user={user} />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
              Top Active Repositories
            </h3>
            <GithubRepos repos={repos} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Github;
