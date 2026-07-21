import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    highlight: false,
    cta: 'Get Started',
    ctaTo: '/signup',
    description: 'Everything you need to start paper trading today.',
    features: [
      '₹1,00,000 virtual starting balance',
      'Real-time live price feed',
      'Market & limit orders',
      'Full order history with filters',
      'Holdings & P&L dashboard',
      'Interactive price charts',
      'Cancel pending limit orders',
      'Wallet & funds overview',
    ],
  },
  {
    name: 'Pro',
    price: 'Coming Soon',
    period: '',
    highlight: true,
    cta: 'Join Waitlist',
    ctaTo: '/signup',
    description: 'Advanced tools for serious practice traders.',
    features: [
      'Everything in Free',
      'Unlimited virtual portfolio resets',
      'Options & futures simulation',
      'Strategy backtesting engine',
      'Portfolio performance history charts',
      'Custom watchlists & price alerts',
      'Leaderboard & social ranking',
      'Priority support',
    ],
  },
];

const faq = [
  {
    q: 'Is TradeStack really free?',
    a: 'Yes. The core platform — live prices, market & limit orders, P&L tracking — is completely free with no credit card required.',
  },
  {
    q: 'Do I trade with real money?',
    a: 'No. Every account uses virtual funds only. You cannot deposit or withdraw real money. TradeStack is a paper-trading simulator for learning purposes.',
  },
  {
    q: 'What happens if I lose all my virtual funds?',
    a: 'A Pro account reset feature is on the roadmap. For now, contact support and we\'ll manually reset your balance.',
  },
  {
    q: 'What exchanges / stocks are available?',
    a: 'TradeStack currently streams prices for a curated set of popular US equities (AAPL, TSLA, MSFT, etc.). More symbols are added regularly.',
  },
  {
    q: 'When will Pro launch?',
    a: 'We\'re actively building the Pro features. Sign up to the waitlist and you\'ll be first to know.',
  },
];

export default function Pricing() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Hero */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Simple, <span className="text-accent">Honest</span> Pricing
        </h1>
        <p className="text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
          TradeStack is free to use. No hidden fees, no commissions, no real money involved.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg border p-8 flex flex-col ${
              plan.highlight
                ? 'border-accent/40 bg-accent/5'
                : 'border-border bg-surface'
            }`}
          >
            {plan.highlight && (
              <span className="self-start text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent text-white mb-4">
                COMING SOON
              </span>
            )}
            <h2 className="text-lg font-bold text-text-primary">{plan.name}</h2>
            <div className="mt-2 mb-1">
              <span className="text-3xl font-bold text-text-primary">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-text-muted ml-1">/ {plan.period}</span>
              )}
            </div>
            <p className="text-sm text-text-muted mb-6">{plan.description}</p>

            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-text-muted">
                  <Check size={14} className="text-profit mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to={plan.ctaTo}
              className={`text-center text-sm font-medium py-2.5 rounded-lg transition-colors ${
                plan.highlight
                  ? 'bg-accent text-white hover:bg-blue-600'
                  : 'border border-border text-text-primary hover:bg-background'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="bg-surface border border-border rounded-lg p-5">
              <p className="text-sm font-semibold text-text-primary mb-1">{item.q}</p>
              <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
