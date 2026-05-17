import { useUIStore } from '../lib/store';
import { Menu } from 'lucide-react';
import { Outlet, Link } from 'react-router-dom';

export const Layout = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-neutral-light bg-surface flex flex-col`}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-neutral-light">
          {isSidebarOpen && <span className="font-display font-bold text-xl text-text-primary">Dashboard</span>}
          <button onClick={toggleSidebar} className="p-2 hover:bg-neutral-light rounded-md text-text-secondary transition-colors cursor-pointer">
            <Menu size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link to="/" className="p-2 rounded-md hover:bg-neutral-light font-medium text-sm text-text-primary hover:text-primary transition-colors">
            {isSidebarOpen ? 'Overview' : 'O'}
          </Link>
          <Link to="/crypto" className="p-2 rounded-md hover:bg-neutral-light font-medium text-sm text-text-primary hover:text-primary transition-colors">
            {isSidebarOpen ? 'Crypto' : 'C'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
