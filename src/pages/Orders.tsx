import { useState, useEffect } from 'react';
import { api } from '../api/client';

interface Order {
  id: string;
  symbol: string;
  type: string;
  side: string;
  quantity: number;
  filledPrice: string | null;
  limitPrice: string | null;
  status: string;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState<string | null>(null);

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

  const handleCancel = async (orderId: string) => {
    setCancelling(orderId);
    try {
      await api.patch(`/orders/${orderId}/cancel`);
      // Optimistically flip to CANCELLED immediately without waiting for the next poll
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED' } : o))
      );
    } catch (err) {
      console.error('Failed to cancel order', err);
    } finally {
      setCancelling(null);
    }
  };

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
                  <th className="text-right font-medium px-4 py-3">Action</th>
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
                      {order.filledPrice
                        ? `$${parseFloat(order.filledPrice).toFixed(2)}`
                        : order.limitPrice
                          ? `$${parseFloat(order.limitPrice).toFixed(2)} (limit)`
                          : '—'}
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
                    <td className="px-4 py-3 text-right">
                      {order.status === 'PENDING' ? (
                        <button
                          id={`cancel-${order.id}`}
                          onClick={() => handleCancel(order.id)}
                          disabled={cancelling === order.id}
                          className="text-xs text-loss border border-loss/40 px-2.5 py-1 rounded hover:bg-loss/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancelling === order.id ? 'Cancelling…' : 'Cancel'}
                        </button>
                      ) : (
                        <span className="text-text-muted text-xs">—</span>
                      )}
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