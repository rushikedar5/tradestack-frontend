import { useState, useEffect } from 'react';
import { api } from '../api/client';

interface Wallet {
  balance: string;
}

export default function Funds() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get('/wallet/balance');
        setWallet(res.data.wallet);
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
      <h1 className="text-3xl font-semibold text-accent tracking-tight mb-6">Funds</h1>

      {loading && <p className="text-text-muted">Loading...</p>}
      {error && <p className="text-loss">{error}</p>}

      {!loading && !error && (
        <div className="bg-surface border border-border rounded-lg shadow-sm p-8 max-w-md">
          <p className="text-sm text-text-muted mb-1">Available Balance</p>
          <p className="text-4xl font-bold text-text-primary font-mono mb-6">
            ${wallet ? parseFloat(wallet.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
          </p>
          <p className="text-xs text-text-muted">
            Deposits and withdrawals coming soon — this project uses virtual funds only.
          </p>
        </div>
      )}
    </div>
  );
}