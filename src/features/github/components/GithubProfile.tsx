import type { GithubUser } from '../api/github';
import { Users, BookOpen, ExternalLink } from 'lucide-react';

interface GithubProfileProps {
  user: GithubUser;
}

export const GithubProfile = ({ user }: GithubProfileProps) => {
  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden transition-all duration-200 hover:shadow-glow">
      <img
        src={user.avatar_url}
        alt={user.name || user.login}
        className="w-24 h-24 rounded-full object-cover border-3 border-primary/20 bg-background"
      />

      <div className="flex-1 space-y-4 text-center sm:text-left">
        <div>
          <h2 className="text-2xl font-display font-bold text-text-primary">
            {user.name || user.login}
          </h2>
          <span className="text-xs font-mono text-text-secondary">@{user.login}</span>
          {user.bio && (
            <p className="text-text-secondary text-sm leading-relaxed mt-2 max-w-xl">
              {user.bio}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border border-neutral-light">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs text-text-secondary">
              <strong className="text-text-primary font-mono">{user.followers}</strong> followers
            </span>
          </div>

          <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border border-neutral-light">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs text-text-secondary">
              <strong className="text-text-primary font-mono">{user.following}</strong> following
            </span>
          </div>

          <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border border-neutral-light">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs text-text-secondary">
              <strong className="text-text-primary font-mono">{user.public_repos}</strong> repos
            </span>
          </div>
        </div>
      </div>

      <div className="self-center sm:self-start">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-light rounded-md font-medium text-xs text-text-secondary bg-surface hover:text-primary hover:border-primary transition-all duration-150 cursor-pointer"
        >
          View Profile <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
