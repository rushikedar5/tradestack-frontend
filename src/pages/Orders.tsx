import { useState, useEffect } from 'react';
import { api } from '../api/client';

interface Order {
  id: string;
  symbol: string;
  type: string;
  side: string;
  quantity: number;
  filledPrice: string | null;
  status: string;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.orders);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();

  const interval = setInterval(fetchOrders, 3000); // refetch every 3s
  return () => clearInterval(interval);
}, []);

  const statusColor: Record<string, string> = {
    FILLED: 'text-profit bg-profit/10',
    PENDING: 'text-accent bg-accent/10',
    CANCELLED: 'text-text-muted bg-text-muted/10',
    REJECTED: 'text-loss bg-loss/10',
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-accent tracking-tight mb-6">Orders</h1>

      {loading && <p className="text-text-muted">Loading...</p>}
      {error && <p className="text-loss">{error}</p>}

      {!loading && !error && (
        <div className="bg-surface border border-border rounded-lg shadow-sm">
          {orders.length === 0 ? (
            <p className="text-sm text-text-muted px-4 py-10 text-center">
              No orders placed yet
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-text-muted border-b border-border">
                  <th className="text-left font-medium px-4 py-3">Symbol</th>
                  <th className="text-left font-medium px-4 py-3">Side</th>
                  <th className="text-left font-medium px-4 py-3">Type</th>
                  <th className="text-right font-medium px-4 py-3">Qty</th>
                  <th className="text-right font-medium px-4 py-3">Price</th>
                  <th className="text-left font-medium px-4 py-3">Status</th>
                  <th className="text-right font-medium px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-text-primary">{order.symbol}</td>
                    <td className={`px-4 py-3 font-medium ${order.side === 'BUY' ? 'text-profit' : 'text-loss'}`}>
                      {order.side}
                    </td>
                    <td className="px-4 py-3 text-text-muted">{order.type}</td>
                    <td className="px-4 py-3 text-right font-mono text-text-primary">{order.quantity}</td>
                    <td className="px-4 py-3 text-right font-mono text-text-primary">
                      {order.filledPrice ? `$${parseFloat(order.filledPrice).toFixed(2)}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${statusColor[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-text-muted text-xs">
                      {new Date(order.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}