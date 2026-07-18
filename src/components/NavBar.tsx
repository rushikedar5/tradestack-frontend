import { LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const appNavItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Orders', path: '/orders' },
  { label: 'Holdings', path: '/holdings' },
  { label: 'Positions', path: '/positions' },
  { label: 'Funds', path: '/funds' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-16 py-6 border-b border-border">
      <Link to={isLoggedIn ? '/dashboard' : '/'} className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path d="M4 4 L20 4 L20 20 Z" fill="currentColor" />
        </svg>
        <span className="text-xl font-semibold text-accent tracking-tight">
          TRADESTACK
        </span>
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-10 text-[15px]">
          {appNavItems.map((item) => (
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
            className="text-text-muted hover:text-loss transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-10 text-text-muted text-[15px]">
          <Link to="/login" className="hover:text-text-primary transition-colors">SignIn</Link>
          <a href="#" className="hover:text-text-primary transition-colors">About</a>
          <a href="#" className="hover:text-text-primary transition-colors">Products</a>
          <a href="#" className="hover:text-text-primary transition-colors">Pricing</a>
          <a href="#" className="hover:text-text-primary transition-colors">Support</a>
        </div>
      )}
    </nav>
  );
}