import { useState, useEffect, useMemo } from 'react';
import { api } from '../api/client';
import { Search, X, SlidersHorizontal } from 'lucide-react';

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

type SideFilter = 'ALL' | 'BUY' | 'SELL';
type TypeFilter = 'ALL' | 'MARKET' | 'LIMIT';
type StatusFilter = 'ALL' | 'FILLED' | 'PENDING' | 'CANCELLED' | 'REJECTED';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [symbolSearch, setSymbolSearch] = useState('');
  const [sideFilter, setSideFilter] = useState<SideFilter>('ALL');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

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
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCancel = async (orderId: string) => {
    setCancelling(orderId);
    try {
      await api.patch(`/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED' } : o))
      );
    } catch (err) {
      console.error('Failed to cancel order', err);
    } finally {
      setCancelling(null);
    }
  };

  const activeFilterCount = [
    symbolSearch !== '',
    sideFilter !== 'ALL',
    typeFilter !== 'ALL',
    statusFilter !== 'ALL',
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSymbolSearch('');
    setSideFilter('ALL');
    setTypeFilter('ALL');
    setStatusFilter('ALL');
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (symbolSearch && !o.symbol.toLowerCase().includes(symbolSearch.toLowerCase())) return false;
      if (sideFilter !== 'ALL' && o.side !== sideFilter) return false;
      if (typeFilter !== 'ALL' && o.type !== typeFilter) return false;
      if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
      return true;
    });
  }, [orders, symbolSearch, sideFilter, typeFilter, statusFilter]);

  const statusColor: Record<string, string> = {
    FILLED: 'text-profit bg-profit/10',
    PENDING: 'text-accent bg-accent/10',
    CANCELLED: 'text-text-muted bg-text-muted/10',
    REJECTED: 'text-loss bg-loss/10',
  };

  const pillBase = 'text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer';
  const pillActive = 'bg-accent text-white border-accent';
  const pillInactive = 'border-border text-text-muted hover:text-text-primary hover:border-text-muted';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-accent tracking-tight">Orders</h1>
        {!loading && !error && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted">
              {filteredOrders.length} of {orders.length} orders
            </span>
            <button
              id="orders-toggle-filters"
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'bg-accent text-white border-accent'
                  : 'border-border text-text-muted hover:text-text-primary hover:border-text-muted'
              }`}
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white/25 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {loading && <p className="text-text-muted">Loading...</p>}
      {error && <p className="text-loss">{error}</p>}

      {!loading && !error && (
        <>
          {/* ── Filter bar ── */}
          {showFilters && (
            <div className="bg-surface border border-border rounded-lg shadow-sm p-4 mb-4 flex flex-wrap gap-4 items-end">

            {/* Symbol search */}
            <div className="flex flex-col gap-1.5 min-w-40">
              <label className="text-xs font-medium text-text-muted">Symbol</label>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                <input
                  id="orders-symbol-search"
                  type="text"
                  placeholder="e.g. AAPL"
                  value={symbolSearch}
                  onChange={(e) => setSymbolSearch(e.target.value.toUpperCase())}
                  className="pl-7 pr-3 py-1.5 text-xs w-full border border-border rounded-lg bg-background placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                />
                {symbolSearch && (
                  <button onClick={() => setSymbolSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Side */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-muted">Side</label>
              <div className="flex gap-1.5">
                {(['ALL', 'BUY', 'SELL'] as SideFilter[]).map((v) => (
                  <button
                    key={v}
                    id={`orders-side-${v.toLowerCase()}`}
                    onClick={() => setSideFilter(v)}
                    className={`${pillBase} ${sideFilter === v ? pillActive : pillInactive}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-muted">Type</label>
              <div className="flex gap-1.5">
                {(['ALL', 'MARKET', 'LIMIT'] as TypeFilter[]).map((v) => (
                  <button
                    key={v}
                    id={`orders-type-${v.toLowerCase()}`}
                    onClick={() => setTypeFilter(v)}
                    className={`${pillBase} ${typeFilter === v ? pillActive : pillInactive}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-muted">Status</label>
              <div className="flex gap-1.5 flex-wrap">
                {(['ALL', 'FILLED', 'PENDING', 'CANCELLED', 'REJECTED'] as StatusFilter[]).map((v) => (
                  <button
                    key={v}
                    id={`orders-status-${v.toLowerCase()}`}
                    onClick={() => setStatusFilter(v)}
                    className={`${pillBase} ${statusFilter === v ? pillActive : pillInactive}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {activeFilterCount > 0 && (
              <button
                id="orders-reset-filters"
                onClick={resetFilters}
                className="self-end flex items-center gap-1.5 text-xs text-text-muted border border-border px-3 py-1.5 rounded-lg hover:text-text-primary hover:border-text-muted transition-colors"
              >
                <X size={12} />
                Reset
                <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {activeFilterCount}
                </span>
              </button>
            )}
          </div>
          )}

          {/* ── Table ── */}
          <div className="bg-surface border border-border rounded-lg shadow-sm">
            {filteredOrders.length === 0 ? (
              <p className="text-sm text-text-muted px-4 py-10 text-center">
                {orders.length === 0 ? 'No orders placed yet' : 'No orders match the selected filters'}
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
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-background transition-colors">
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
        </>
      )}
    </div>
  );
}