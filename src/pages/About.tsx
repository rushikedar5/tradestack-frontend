import { TrendingUp, Zap, Shield, BarChart2, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const milestones = [
  { year: '2024', text: 'TradeStack founded with a mission to democratise trading education.' },
  { year: 'Early 2025', text: 'Launched real-time paper trading with live market data feeds.' },
  { year: 'Mid 2025', text: 'Added limit orders, portfolio analytics and Redis-backed performance.' },
  { year: 'Today', text: 'Serving thousands of aspiring traders practising risk-free every day.' },
];

const values = [
  {
    icon: <Shield size={22} className="text-accent" />,
    title: 'Risk-Free Learning',
    desc: 'Every account starts with virtual funds. Blow it up, reset, and learn — no real money ever at stake.',
  },
  {
    icon: <Zap size={22} className="text-accent" />,
    title: 'Real-Time Data',
    desc: 'Live prices streamed via WebSocket so your practice trades reflect actual market conditions.',
  },
  {
    icon: <BarChart2 size={22} className="text-accent" />,
    title: 'Realistic Mechanics',
    desc: 'Market orders, limit orders, P&L tracking, and portfolio snapshots — just like a real brokerage.',
  },
  {
    icon: <Users size={22} className="text-accent" />,
    title: 'Built for Everyone',
    desc: 'Whether you\'re a curious beginner or a seasoned trader stress-testing strategies, TradeStack fits.',
  },
  {
    icon: <Globe size={22} className="text-accent" />,
    title: 'Open & Transparent',
    desc: 'No hidden fees, no dark patterns. TradeStack is a portfolio project built in the open.',
  },
  {
    icon: <TrendingUp size={22} className="text-accent" />,
    title: 'Continuous Growth',
    desc: 'New features ship regularly — options, charting overlays, and leaderboards are on the roadmap.',
  },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          About <span className="text-accent">TradeStack</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          TradeStack is a real-time paper trading platform built to help you master the stock market
          without risking a single rupee. Practice, analyse, and grow — until you're ready to trade for real.
        </p>
      </div>

      {/* Values grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {values.map((v) => (
          <div key={v.title} className="bg-surface border border-border rounded-lg p-6">
            <div className="mb-3">{v.icon}</div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">{v.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Our Journey</h2>
        <div className="space-y-6 border-l border-border pl-6">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <span className="absolute -left-7.25 top-1 w-3 h-3 rounded-full bg-accent border-2 border-background" />
              <p className="text-xs font-medium text-accent mb-1">{m.year}</p>
              <p className="text-sm text-text-muted">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Ready to start trading?</h2>
        <p className="text-sm text-text-muted mb-6">Create a free account and get $1,00,000 in virtual funds instantly.</p>
        <Link
          to="/signup"
          className="inline-block bg-accent text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get Started — It's Free
        </Link>
      </div>
    </div>
  );
}
