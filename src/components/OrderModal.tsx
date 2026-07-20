import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/client';
import Button from './Button';

interface OrderModalProps {
  symbol: string;
  currentPrice: number;
  side: 'BUY' | 'SELL';
  /** For SELL orders — the number of shares the user currently holds */
  maxQuantity?: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OrderModal({ symbol, currentPrice, side, maxQuantity, onClose, onSuccess }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const total = quantity * currentPrice;

  // For SELL: treat missing holding as 0 shares owned
  const ownedQty = side === 'SELL' ? (maxQuantity ?? 0) : undefined;
  const hasNoShares = side === 'SELL' && ownedQty === 0;

  const atMax = side === 'SELL' && ownedQty !== undefined && quantity >= ownedQty;
  const atMin = quantity <= 1;

  const increment = () => {
    if (!atMax) setQuantity((q) => q + 1);
  };

  const decrement = () => {
    if (!atMin) setQuantity((q) => q - 1);
  };

  const handleManualInput = (val: number) => {
    if (isNaN(val) || val < 1) return setQuantity(1);
    if (side === 'SELL' && ownedQty !== undefined && val > ownedQty) return setQuantity(ownedQty);
    setQuantity(val);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const endpoint = side === 'BUY' ? '/orders/buy' : '/orders/sell';
      await api.post(endpoint, { symbol, quantity, price: currentPrice });
      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Order failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold text-text-primary mb-1">
          {side === 'BUY' ? 'Buy' : 'Sell'} {symbol}
        </h2>
        <p className="text-sm text-text-muted mb-4">
          Market price: <span className="font-mono">${currentPrice.toFixed(2)}</span>
        </p>

        {error && (
          <p className="bg-red-500/10 text-loss text-sm px-3 py-2 rounded mb-4">
            {error}
          </p>
        )}

        {/* Quantity stepper */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-text-muted mb-2">Quantity</label>
          <div className="flex items-center gap-3">
            {/* Decrement */}
            <button
              onClick={decrement}
              disabled={atMin}
              className={`w-9 h-9 rounded-lg border text-lg font-semibold flex items-center justify-center transition-colors
                ${atMin
                  ? 'border-border/40 text-text-muted/30 cursor-not-allowed opacity-40'
                  : 'border-border text-text-primary hover:bg-background'}`}
            >
              −
            </button>

            {/* Input */}
            <input
              type="number"
              min={1}
              max={side === 'SELL' ? maxQuantity : undefined}
              value={quantity}
              onChange={(e) => handleManualInput(Number(e.target.value))}
              className="flex-1 text-center border border-border rounded-lg py-2 bg-background text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />

            {/* Increment */}
            <button
              onClick={increment}
              disabled={atMax}
              title={atMax ? `You only own ${maxQuantity} shares` : undefined}
              className={`w-9 h-9 rounded-lg border text-lg font-semibold flex items-center justify-center transition-colors
                ${atMax
                  ? 'border-border/40 text-text-muted/30 cursor-not-allowed opacity-40'
                  : 'border-border text-text-primary hover:bg-background'}`}
            >
              +
            </button>
          </div>

          {/* Cap / no-shares warning */}
          {hasNoShares && (
            <p className="mt-2 text-xs text-loss flex items-center gap-1.5">
              <span>✕</span>
              <span>You don't own any shares of <span className="font-semibold">{symbol}</span> to sell.</span>
            </p>
          )}
          {atMax && !hasNoShares && (
            <p className="mt-2 text-xs text-amber-400 flex items-center gap-1.5">
              <span>⚠</span>
              <span>You only own <span className="font-semibold">{ownedQty}</span> shares of {symbol}. Can't sell more.</span>
            </p>
          )}
        </div>

        {/* Estimated total */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="text-text-muted">
            Estimated {side === 'BUY' ? 'cost' : 'proceeds'}
          </span>
          <span className="font-mono font-semibold text-text-primary">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-border text-text-primary rounded-lg py-2.5 font-medium hover:bg-background transition-colors"
          >
            Cancel
          </button>
          <div className="flex-1">
            <Button
              onClick={handleSubmit}
              disabled={loading || hasNoShares}
              variant={side === 'SELL' ? 'danger' : 'primary'}
            >
              {loading ? 'Placing...' : `Confirm ${side === 'BUY' ? 'Buy' : 'Sell'}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}