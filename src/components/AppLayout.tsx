import { useNavigate, Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Orders', path: '/orders' },
  { label: 'Holdings', path: '/holdings' },
  { label: 'Positions', path: '/positions' },
  { label: 'Funds', path: '/funds' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-16 py-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
            <path d="M4 4 L20 4 L20 20 Z" fill="currentColor" />
          </svg>
          <span className="text-xl font-semibold text-accent tracking-tight">
            TRADESTACK
          </span>
        </Link>

        <div className="flex items-center gap-10 text-[15px]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path
                  ? 'text-accent font-medium'
                  : 'text-text-muted hover:text-text-primary transition-colors'
              }
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-text-muted hover:text-loss transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="p-8">{children}</div>
    </div>
  );
}