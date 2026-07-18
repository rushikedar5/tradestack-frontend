import { useState, useEffect } from 'react';
import { api } from '../api/client';

interface Wallet {
  balance: string;
}

export default function Dashboard() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await api.get('/wallet/balance');
        setWallet(response.data.wallet);
      } catch (err) {
        setError('Failed to load wallet');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>

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
            <p className="text-3xl font-bold text-text-primary font-mono">₹0.00</p>
          </div>

          <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
            <p className="text-sm text-text-muted mb-1">Total P&L</p>
            <p className="text-3xl font-bold text-profit font-mono">₹0.00</p>
          </div>
        </div>
      )}
    </div>
  );
}