import { useState, useEffect } from 'react';
import { api } from '../api/client';
import Watchlist from '../components/WatchList';
import PriceChart from '../components/PriceChart';

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

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-accent tracking-tight mb-6">Dashboard</h1>

      {loading && <p className="text-text-muted">Loading...</p>}
      {error && <p className="text-loss">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <p className="text-sm text-text-muted mb-1">Wallet Balance</p>
              <p className="text-3xl font-bold text-text-primary font-mono">
                ₹{wallet ? parseFloat(wallet.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <p className="text-sm text-text-muted mb-1">Holdings Value</p>
              <p className="text-3xl font-bold text-text-primary font-mono">
                ₹{holdings.reduce((total, h) => total + h.quantity * parseFloat(h.avgPrice), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <p className="text-sm text-text-muted mb-1">Total P&L</p>
              <p className="text-3xl font-bold text-profit font-mono">₹0.00</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
            <div className="lg:col-span-1">
              <Watchlist selectedSymbol={selectedSymbol} onSelectSymbol={setSelectedSymbol} />
            </div>

            <div className="lg:col-span-3 bg-surface border border-border rounded-lg shadow-sm p-4 flex flex-col">
              <p className="text-sm font-semibold text-text-primary mb-3">
                {selectedSymbol} — Live Chart
              </p>
              <div className="flex-1 min-h-100">
                <PriceChart symbol={selectedSymbol} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}