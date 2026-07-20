import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useLivePrices } from '../context/LivePricesContext';
import { DollarSign, Briefcase, TrendingUp } from 'lucide-react';

interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  avgPrice: string;
}

export default function Holdings() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const livePrices = useLivePrices();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await api.get('/holding');
        setHoldings(res.data.holdings);
      } catch (err) {
        setError('Failed to load holdings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHoldings();
  }, []);

  const totalValue = holdings.reduce((sum, h) => {
    const price = livePrices[h.symbol] ?? parseFloat(h.avgPrice);
    return sum + h.quantity * price;
  }, 0);

  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.quantity * parseFloat(h.avgPrice),
    0
  );

  const totalPnl = totalValue - totalInvested;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-accent tracking-tight mb-6">Holdings</h1>

      {loading && <p className="text-text-muted">Loading...</p>}
      {error && <p className="text-loss">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={16} className="text-text-muted" />
                <p className="text-sm text-text-muted">Invested</p>
              </div>
              <p className="text-2xl font-semibold text-text-primary font-mono">
                ${totalInvested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={16} className="text-text-muted" />
                <p className="text-sm text-text-muted">Current Value</p>
              </div>
              <p className="text-2xl font-semibold text-text-primary font-mono">
                ${totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-text-muted" />
                <p className="text-sm text-text-muted">Total P&L</p>
              </div>
              <p className={`text-2xl font-semibold font-mono ${totalPnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg shadow-sm">
            {holdings.length === 0 ? (
              <p className="text-sm text-text-muted px-4 py-10 text-center">
                You don't own any stocks yet
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-text-muted border-b border-border">
                    <th className="text-left font-medium px-4 py-3">Symbol</th>
                    <th className="text-right font-medium px-4 py-3">Qty</th>
                    <th className="text-right font-medium px-4 py-3">Avg Price</th>
                    <th className="text-right font-medium px-4 py-3">LTP</th>
                    <th className="text-right font-medium px-4 py-3">Value</th>
                    <th className="text-right font-medium px-4 py-3">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => {
                    const ltp = livePrices[h.symbol] ?? parseFloat(h.avgPrice);
                    const value = h.quantity * ltp;
                    const invested = h.quantity * parseFloat(h.avgPrice);
                    const pnl = value - invested;

                    return (
                      <tr key={h.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-medium text-text-primary">{h.symbol}</td>
                        <td className="px-4 py-3 text-right font-mono text-text-primary">{h.quantity}</td>
                        <td className="px-4 py-3 text-right font-mono text-text-primary">
                          ${parseFloat(h.avgPrice).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-text-primary">
                          ${ltp.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-text-primary">
                          ${value.toFixed(2)}
                        </td>
                        <td className={`px-4 py-3 text-right font-mono ${pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                          {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}