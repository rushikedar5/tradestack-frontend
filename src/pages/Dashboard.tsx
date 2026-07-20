import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import Watchlist from '../components/WatchList';
import PriceChart from '../components/PriceChart';
import OrderModal from '../components/OrderModal';
import { Wallet, Briefcase, TrendingUp } from 'lucide-react';

interface Wallet {
  balance: string;
}

interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  avgPrice: string;
}

export default function Dashboard() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [activeOrder, setActiveOrder] = useState<{ symbol: string; price: number; side: 'BUY' | 'SELL'; maxQuantity?: number } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [walletRes, holdingsRes] = await Promise.all([
        api.get('/wallet/balance'),
        api.get('/holding'),
      ]);
      setWallet(walletRes.data.wallet);
      setHoldings(holdingsRes.data.holdings);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-accent tracking-tight mb-6">Dashboard</h1>

      {loading && <p className="text-text-muted">Loading...</p>}
      {error && <p className="text-loss">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={16} className="text-accent" />
                <p className="text-sm text-text-muted">Wallet Balance</p>
              </div>
              <p className="text-3xl font-bold text-text-primary font-mono">
                ${wallet ? parseFloat(wallet.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={16} className="text-text-muted" />
                <p className="text-sm text-text-muted">Holdings Value</p>
              </div>
              <p className="text-3xl font-semibold text-text-primary font-mono">
                ${holdings.reduce((total, h) => total + h.quantity * parseFloat(h.avgPrice), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-text-muted" />
                <p className="text-sm text-text-muted">Total P&L</p>
              </div>
              <p className="text-3xl font-semibold text-profit font-mono">$0.00</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <Watchlist
                selectedSymbol={selectedSymbol}
                onSelectSymbol={setSelectedSymbol}
                onBuyClick={(symbol, price) => setActiveOrder({ symbol, price, side: 'BUY' })}
                onSellClick={(symbol, price) => {
                  const holding = holdings.find((h) => h.symbol === symbol);
                  setActiveOrder({ symbol, price, side: 'SELL', maxQuantity: holding?.quantity });
                }}
              />
            </div>

            <div className="lg:col-span-3 bg-surface border border-border rounded-lg shadow-sm p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-semibold text-text-primary">
                  {selectedSymbol} — Live Chart
                </p>
                <span className="flex items-center gap-1.5 text-xs text-profit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-profit"></span>
                  </span>
                  Live
                </span>
              </div>
              <div className="flex-1 min-h-100">
                <PriceChart symbol={selectedSymbol} />
              </div>
            </div>
          </div>

          {activeOrder && (
            <OrderModal
              symbol={activeOrder.symbol}
              currentPrice={activeOrder.price}
              side={activeOrder.side}
              maxQuantity={activeOrder.maxQuantity}
              onClose={() => setActiveOrder(null)}
              onSuccess={() => {
                setActiveOrder(null);
                fetchData();
              }}
            />
          )}
        </>
      )}
    </div>
  );
}