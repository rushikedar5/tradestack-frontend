import { BarChart2, BookOpen, Zap, TrendingUp, Bell, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Zap size={28} className="text-accent" />,
    title: 'Live Market Feed',
    desc: 'Prices streamed over WebSocket in real time from live exchanges. Every tick is reflected instantly in your watchlist, charts, and P&L.',
    badge: 'Live',
  },
  {
    icon: <BarChart2 size={28} className="text-accent" />,
    title: 'Interactive Charts',
    desc: 'Candlestick price charts per symbol, updated as new ticks arrive. Identify patterns and validate your strategies visually.',
    badge: null,
  },
  {
    icon: <TrendingUp size={28} className="text-accent" />,
    title: 'Market & Limit Orders',
    desc: 'Place market orders for instant fills, or set limit orders that execute automatically when the price hits your target.',
    badge: null,
  },
  {
    icon: <BookOpen size={28} className="text-accent" />,
    title: 'Portfolio & Holdings',
    desc: 'Full holdings dashboard with live-valued P&L, average buy price, current LTP, and per-stock breakdown.',
    badge: null,
  },
  {
    icon: <Bell size={28} className="text-accent" />,
    title: 'Order History',
    desc: 'Complete order log with filters by symbol, side, type, and status. Cancel pending limit orders with one click.',
    badge: null,
  },
  {
    icon: <Lock size={28} className="text-accent" />,
    title: 'Virtual Funds',
    desc: 'Every account is seeded with ₹1,00,000 in virtual funds. Zero real-money risk, maximum learning.',
    badge: 'Safe',
  },
];

export default function Products() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          What <span className="text-accent">TradeStack</span> Offers
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          Everything you need to practice trading like a pro — without a brokerage account or real capital.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((f) => (
          <div key={f.title} className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              {f.icon}
              {f.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                  {f.badge}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">{f.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap teaser */}
      <div className="bg-surface border border-border rounded-lg p-8 mb-10">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Coming Soon</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-muted">
          {[
            'Options & Futures paper trading',
            'Portfolio performance charts over time',
            'Leaderboard — compete with other traders',
            'Custom watchlists & price alerts',
            'Backtesting engine for strategy testing',
            'Mobile-responsive PWA',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/signup"
          className="inline-block bg-accent text-white text-sm font-medium px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Trading for Free
        </Link>
      </div>
    </div>
  );
}
