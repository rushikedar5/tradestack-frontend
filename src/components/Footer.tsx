import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const footerLinks = {
    Account: ['Get started', 'Paper trading', 'Wallet', 'Portfolio', 'Watchlist'],
    Support: ['Contact us', 'Support portal', 'How it works', 'FAQs', 'Bulletin'],
    Company: ['About', 'Philosophy', 'Learning log', 'Open source', 'Roadmap'],
    'Quick links': ['Markets', 'Sectors', 'Calculators', 'API docs', 'Changelog'],
};

export default function Footer() {
    return (
        <footer className="px-16 py-16 bg-surface border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                {/* Brand column */}
                <div>
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-accent">
                            <path d="M4 4 L20 4 L20 20 Z" fill="currentColor" />
                        </svg>
                        <span className="text-xl font-bold text-accent tracking-tight">
                            TRADESTACK
                        </span>
                    </Link>
                    <p className="text-sm text-text-muted mb-1">© 2026 TradeStack.</p>
                    <p className="text-sm text-text-muted mb-6">A learning project — not a real broker.</p>

                    <div className="flex gap-4 text-text-muted">
                        <a href="#" className="hover:text-text-primary"><FaTwitter size={18} /></a>
                        <a href="#" className="hover:text-text-primary"><FaGithub size={18} /></a>
                        <a href="#" className="hover:text-text-primary"><FaLinkedin size={18} /></a>
                        <a href="#" className="hover:text-text-primary"><FaYoutube size={18} /></a>
                    </div>
                </div>

                {/* Link columns */}
                {Object.entries(footerLinks).map(([heading, links]) => (
                    <div key={heading}>
                        <h4 className="font-semibold text-text-primary mb-4">{heading}</h4>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-text-muted hover:text-text-primary">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Disclaimer strip */}
            <div className="mt-16 pt-8 border-t border-border">
                <p className="text-xs text-text-muted leading-relaxed max-w-4xl">
                    TradeStack is a personal learning project built to practice full-stack engineering.
                    It simulates trading using virtual funds and delayed/live public market data — no real
                    money, securities, or brokerage services are involved. Nothing on this platform is
                    financial advice.
                </p>
            </div>
        </footer>
    );
}