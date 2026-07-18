import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { socket } from '../socket';

interface Wallet {
  balance: string;
}

export default function Dashboard() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const handlePriceUpdate = (data: PriceUpdate) => {
      setPrices((prev) => ({ ...prev, [data.symbol]: data.price }));
    };

    socket.on('price_update', handlePriceUpdate);

    return () => {
      socket.off('price_update', handlePriceUpdate);
    };
  }, []);

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

  interface Holding {
    id: string;
    symbol: string;
    quantity: number;
    avgPrice: string;
  }

  interface PriceUpdate {
    symbol: string;
    price: number;
    timestamp: number;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-accent tracking-tight mb-6">Dashboard</h1>

      {loading && <p className="text-text-muted">Loading...</p>}
      {error && <p className="text-loss">{error}</p>}

      {!loading && !error && (
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
              ₹{holdings.reduce((total, holding) => total + (holding.quantity * parseFloat(holding.avgPrice)), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
            <p className="text-sm text-text-muted mb-1">Total P&L</p>
            <p className="text-3xl font-bold text-profit font-mono">₹0.00</p>
          </div>

          <div className="mt-6 bg-surface border border-border rounded-lg p-4">
            <p className="text-sm text-text-muted mb-2">Live Prices (temporary debug view)</p>
            {Object.entries(prices).map(([symbol, price]) => (
              <p key={symbol} className="font-mono text-text-primary">
                {symbol}: ${price.toFixed(2)}
              </p>
            ))}
          </div>
        </div>


      )}
    </div>
  );
}