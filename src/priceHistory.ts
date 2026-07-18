import { socket } from './socket';

interface PricePoint {
  time: number;
  value: number;
}

const history: Record<string, PricePoint[]> = {};

const MAX_POINTS_PER_SYMBOL = 500; // cap memory usage — keep last 500 ticks per symbol

socket.on('price_update', (data: { symbol: string; price: number; timestamp: number }) => {
  if (!history[data.symbol]) {
    history[data.symbol] = [];
  }

  history[data.symbol].push({
    time: Math.floor(data.timestamp / 1000),
    value: data.price,
  });

  if (history[data.symbol].length > MAX_POINTS_PER_SYMBOL) {
    history[data.symbol].shift(); // remove oldest point
  }
});

export const getHistory = (symbol: string): PricePoint[] => {
  return history[symbol] || [];
};