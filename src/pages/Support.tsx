import { MessageCircle, BookOpen, AlertTriangle, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const guides = [
  {
    title: 'Placing a Market Order',
    steps: [
      'Go to the Dashboard.',
      'Find your stock in the Watchlist.',
      'Click the Buy or Sell button on that row.',
      'In the Order Modal, make sure Order Type is set to Market.',
      'Set the quantity and click Confirm.',
      'The order fills instantly at the current live price.',
    ],
  },
  {
    title: 'Placing a Limit Order',
    steps: [
      'Open the Order Modal from the Watchlist.',
      'Click the Limit tab in the modal.',
      'Enter your desired limit price (buy below market / sell above market).',
      'Set quantity and confirm.',
      'The order stays PENDING until the market price crosses your limit.',
      'You can cancel it anytime from the Orders page.',
    ],
  },
  {
    title: 'Cancelling a Pending Limit Order',
    steps: [
      'Navigate to Orders in the top menu.',
      'Find the order with status PENDING.',
      'Click the Cancel button on the right.',
      'The order is immediately marked CANCELLED and will no longer execute.',
    ],
  },
  {
    title: 'Reading Your Holdings',
    steps: [
      'Go to Holdings.',
      'Each row shows your symbol, quantity, average buy price, live price (LTP), current value, and P&L.',
      'The three summary cards at the top show total invested, current value, and overall P&L.',
      'All values update in real time as prices tick.',
    ],
  },
];

function Accordion({ title, steps }: { title: string; steps: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-text-primary">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-text-muted shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-text-muted shrink-0" />
        )}
      </button>
      {open && (
        <ol className="px-5 pb-5 space-y-2 border-t border-border pt-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-text-muted">
              <span className="text-accent font-mono font-bold shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const commonIssues = [
  {
    icon: <AlertTriangle size={16} className="text-loss shrink-0 mt-0.5" />,
    problem: 'Order failed — Insufficient wallet balance',
    fix: 'Your virtual wallet balance is too low to cover the order total. Go to Funds to check your balance. You cannot add more virtual funds manually in the Free plan.',
  },
  {
    icon: <AlertTriangle size={16} className="text-loss shrink-0 mt-0.5" />,
    problem: 'Limit order stays PENDING forever',
    fix: 'A BUY limit order only fills when the market price drops to or below your limit price. A SELL limit order fills when the market price rises to or above your limit. If the price never crosses, the order stays open.',
  },
  {
    icon: <AlertTriangle size={16} className="text-loss shrink-0 mt-0.5" />,
    problem: 'Watchlist shows "Waiting for live prices…"',
    fix: 'The backend market feed may have not started yet, or you may be disconnected. Refresh the page. If the issue persists, the backend server may be down.',
  },
  {
    icon: <AlertTriangle size={16} className="text-loss shrink-0 mt-0.5" />,
    problem: 'P&L on Dashboard and Holdings differ',
    fix: 'Both pages now share the same live price feed via a shared context. If you see a difference, try a hard refresh (Cmd+Shift+R).',
  },
];

export default function Support() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      {/* Hero */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          <span className="text-accent">Support</span> & Help Centre
        </h1>
        <p className="text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
          Guides, troubleshooting tips, and ways to reach us.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {[
          { icon: <BookOpen size={20} className="text-accent" />, label: 'How-To Guides', anchor: '#guides' },
          { icon: <AlertTriangle size={20} className="text-accent" />, label: 'Common Issues', anchor: '#issues' },
          { icon: <Mail size={20} className="text-accent" />, label: 'Contact Us', anchor: '#contact' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.anchor}
            className="bg-surface border border-border rounded-lg p-5 flex items-center gap-3 hover:border-accent/40 transition-colors"
          >
            {item.icon}
            <span className="text-sm font-medium text-text-primary">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Guides */}
      <section id="guides" className="mb-14">
        <h2 className="text-xl font-semibold text-text-primary mb-5 flex items-center gap-2">
          <BookOpen size={18} className="text-accent" /> How-To Guides
        </h2>
        <div className="space-y-3">
          {guides.map((g) => (
            <Accordion key={g.title} title={g.title} steps={g.steps} />
          ))}
        </div>
      </section>

      {/* Common issues */}
      <section id="issues" className="mb-14">
        <h2 className="text-xl font-semibold text-text-primary mb-5 flex items-center gap-2">
          <AlertTriangle size={18} className="text-accent" /> Common Issues
        </h2>
        <div className="space-y-4">
          {commonIssues.map((issue) => (
            <div key={issue.problem} className="bg-surface border border-border rounded-lg p-5">
              <div className="flex items-start gap-2 mb-2">
                {issue.icon}
                <p className="text-sm font-semibold text-text-primary">{issue.problem}</p>
              </div>
              <p className="text-sm text-text-muted leading-relaxed pl-6">{issue.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2 className="text-xl font-semibold text-text-primary mb-5 flex items-center gap-2">
          <MessageCircle size={18} className="text-accent" /> Contact Us
        </h2>
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-text-muted mb-2">
            Can't find what you're looking for? Reach out directly.
          </p>
          <a
            href="mailto:support@tradestack.dev"
            className="text-accent font-medium hover:underline text-sm"
          >
            support@tradestack.dev
          </a>
          <p className="text-xs text-text-muted mt-4">
            We typically respond within 24 hours on weekdays.
          </p>
        </div>
      </section>
    </div>
  );
}
