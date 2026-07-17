import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-16 py-6 border-b border-border">
      <Link to="/" className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path d="M4 4 L20 4 L20 20 Z" fill="currentColor" />
        </svg>
        <span className="text-xl font-semibold text-accent tracking-tight">
          TRADESTACK
        </span>
      </Link>
      <div className="flex items-center gap-10 text-text-muted text-[15px]">
        <Link to="/signup" className="hover:text-text-primary transition-colors">Signup</Link>
        <a href="#" className="hover:text-text-primary transition-colors">About</a>
        <a href="#" className="hover:text-text-primary transition-colors">Products</a>
        <a href="#" className="hover:text-text-primary transition-colors">Pricing</a>
        <a href="#" className="hover:text-text-primary transition-colors">Support</a>
        <Menu size={22} className="text-text-primary" />
      </div>
    </nav>
  );
}