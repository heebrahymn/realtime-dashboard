import { useUIStore } from '../lib/store';
import { Menu, LayoutDashboard, Coins, CloudSun, Landmark, Music, Activity } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Layout = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
    { path: '/ngx', label: 'NGX Stocks', icon: <Landmark className="w-4.5 h-4.5" /> },
    { path: '/crypto', label: 'Crypto', icon: <Coins className="w-4.5 h-4.5" /> },
    { path: '/weather', label: 'Weather', icon: <CloudSun className="w-4.5 h-4.5" /> },
    { path: '/github', label: 'GitHub', icon: <GithubIcon className="w-4.5 h-4.5" /> },
    { path: '/spotify', label: 'Spotify', icon: <Music className="w-4.5 h-4.5" /> },
    { path: '/facebook', label: 'Facebook', icon: <FacebookIcon className="w-4.5 h-4.5" /> },
    { path: '/semrush', label: 'Semrush', icon: <Activity className="w-4.5 h-4.5" /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-neutral-light bg-surface flex flex-col`}>
        <div className="h-14 flex items-center justify-between px-5 border-b border-neutral-light">
          {isSidebarOpen && (
            <span className="font-display font-bold text-lg tracking-tight text-text-primary">
              Telemetry Board
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-neutral-light rounded-md text-text-secondary transition-colors cursor-pointer ml-auto"
          >
            <Menu size={18} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-[14px] transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-text-secondary hover:text-text-primary hover:bg-neutral-light'
                }`}
              >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
