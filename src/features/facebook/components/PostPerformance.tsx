import { Video, Image, Link2, FileText, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import type { FacebookPost } from '../api/mockData';

interface PostPerformanceProps {
  posts: FacebookPost[];
}

export const PostPerformance = ({ posts }: PostPerformanceProps) => {
  // Find highest reach to compute ratios
  const maxReach = Math.max(...posts.map((p) => p.reach), 10000);

  const getPostIcon = (type: FacebookPost['type']) => {
    switch (type) {
      case 'Video':
        return <Video className="w-4 h-4 text-blue-600" />;
      case 'Photo':
        return <Image className="w-4 h-4 text-emerald-600" />;
      case 'Link':
        return <Link2 className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-orange-600" />;
    }
  };

  return (
    <div className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
            Content Quality
          </p>
          <h3 className="text-lg font-display font-bold text-text-primary">
            Recent Post Analytics
          </h3>
        </div>
        <span className="text-xs font-semibold text-text-secondary bg-neutral-light/50 px-2.5 py-1 rounded-full border border-neutral-light">
          Last 7 Days
        </span>
      </div>

      <div className="space-y-4">
        {posts.map((post) => {
          const reachRatio = Math.min((post.reach / maxReach) * 100, 100);
          return (
            <div
              key={post.id}
              className="p-4 rounded-lg border border-neutral-light bg-surface hover:border-blue-500/15 hover:bg-blue-500/[0.01] hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start gap-3.5">
                {/* Visual Type Indicator */}
                <span className="p-2.5 bg-neutral-light/40 rounded-lg flex-shrink-0">
                  {getPostIcon(post.type)}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-text-primary line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                  <p className="text-[10px] text-text-secondary mt-1 font-mono">
                    Published {post.publishedAt} • <span className="font-bold text-blue-600">{post.type}</span>
                  </p>
                </div>
              </div>

              {/* Reach Meter Ratio */}
              <div className="my-3.5 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-text-secondary">Organic Reach</span>
                  <span className="text-text-primary font-bold">{post.reach.toLocaleString()} accounts</span>
                </div>
                <div className="w-full bg-neutral-light rounded-full h-1 relative overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${reachRatio}%` }}
                  />
                </div>
              </div>

              {/* Engagement Reaction Panel */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-light/50 text-[11px] font-mono text-text-secondary">
                <div className="flex items-center gap-3.5">
                  <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {post.engagement.likes}
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.engagement.comments}
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Share2 className="w-3.5 h-3.5" />
                    {post.engagement.shares}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span>Clicks: <strong className="text-text-primary">{post.clicks.toLocaleString()}</strong></span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
                    CTR: {post.ctr}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
