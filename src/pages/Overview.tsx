import { Link } from 'react-router-dom';
import { Coins, CloudSun, Landmark, ArrowRight, Music, Activity } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Overview = () => {
  const telemetryStats = [
    {
      title: 'NGX Investments',
      desc: 'Track leading Nigerian bluechips and simulate long-term holding growth.',
      icon: <Landmark className="w-8 h-8 text-primary" />,
      link: '/ngx',
      status: 'Online',
      badgeColor: 'bg-success/10 text-success border-success/20',
    },
    {
      title: 'Crypto Markets',
      desc: 'Top tradable assets and interactive historical price timelines.',
      icon: <Coins className="w-8 h-8 text-primary" />,
      link: '/crypto',
      status: 'Online',
      badgeColor: 'bg-success/10 text-success border-success/20',
    },
    {
      title: 'Weather Station',
      desc: 'Realtime global atmospheric metrics and weekly forecasts.',
      icon: <CloudSun className="w-8 h-8 text-primary" />,
      link: '/weather',
      status: 'Online',
      badgeColor: 'bg-success/10 text-success border-success/20',
    },
    {
      title: 'GitHub Insights',
      desc: 'Open source repository stats and profile developer telemetry.',
      icon: <GithubIcon className="w-8 h-8 text-primary" />,
      link: '/github',
      status: 'Online',
      badgeColor: 'bg-success/10 text-success border-success/20',
    },
    {
      title: 'Spotify Stream',
      desc: 'Live audio playback tracking, sound attributes, and weekly duration charts.',
      icon: <Music className="w-8 h-8 text-primary" />,
      link: '/spotify',
      status: 'Online',
      badgeColor: 'bg-success/10 text-success border-success/20',
    },
    {
      title: 'Facebook Insights',
      desc: 'Social feed engagement tracker and interactive Meta ad campaign monitor.',
      icon: <FacebookIcon className="w-8 h-8 text-primary" />,
      link: '/facebook',
      status: 'Online',
      badgeColor: 'bg-success/10 text-success border-success/20',
    },
    {
      title: 'Semrush Analysis',
      desc: 'Dynamic competitor tracking and interactive SEO keyword positioning radar.',
      icon: <Activity className="w-8 h-8 text-orange-500" />,
      link: '/semrush',
      status: 'Online',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
          Global Telemetry Aggregator
        </span>
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight mb-2">
          System Overview
        </h1>
        <p className="text-text-secondary text-[15px] font-body">
          A premium unified operations board monitoring third-party API metrics seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {telemetryStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-surface border border-neutral-light rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-250 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {stat.icon}
                <span className={`px-2 py-0.5 border text-xs font-semibold rounded-full ${stat.badgeColor}`}>
                  {stat.status}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-text-primary mb-1">
                  {stat.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-light flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
                Active Node
              </span>
              <Link
                to={stat.link}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover group transition-colors"
              >
                Inspect Telemetry
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Overview;
