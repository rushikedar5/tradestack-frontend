import { socket } from './socket';

interface PriceState {
  price: number;
  prevPrice: number;
  dayOpen: number;
}

const prices: Record<string, PriceState> = {};
const listeners = new Set<() => void>();

socket.on('price_update', (data: { symbol: string; price: number; timestamp: number }) => {
  const existing = prices[data.symbol];

  prices[data.symbol] = {
    price: data.price,
    prevPrice: existing ? existing.price : data.price,
    dayOpen: existing ? existing.dayOpen : data.price,
  };

  listeners.forEach((listener) => listener());
});

export const getLivePrices = (): Record<string, PriceState> => prices;

export const subscribeLivePrices = (callback: () => void): (() => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};