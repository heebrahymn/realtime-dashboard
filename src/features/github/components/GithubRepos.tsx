import type { GithubRepo } from '../api/github';
import { Star, GitFork, Book } from 'lucide-react';

interface GithubReposProps {
  repos: GithubRepo[];
}

export const GithubRepos = ({ repos }: GithubReposProps) => {
  if (repos.length === 0) {
    return (
      <div className="bg-surface border border-neutral-light p-8 rounded-xl text-center text-text-secondary">
        No public repositories found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface border border-neutral-light rounded-xl p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow flex flex-col justify-between group cursor-pointer"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              <h4 className="font-display font-bold text-text-primary text-[15px] group-hover:text-primary transition-colors truncate">
                {repo.name}
              </h4>
            </div>
            {repo.description && (
              <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
                {repo.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-light mt-4">
            {repo.language && (
              <span className="text-[11px] font-semibold text-text-secondary bg-background px-2 py-0.5 rounded-full">
                {repo.language}
              </span>
            )}
            <div className="flex gap-3 text-text-secondary ml-auto">
              <span className="flex items-center gap-1 text-[11px] font-mono">
                <Star className="w-3.5 h-3.5" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
