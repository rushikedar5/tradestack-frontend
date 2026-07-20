import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { socket } from '../socket';

type LivePrices = Record<string, number>;

const LivePricesContext = createContext<LivePrices>({});

export function LivePricesProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<LivePrices>({});

  useEffect(() => {
    const handlePriceUpdate = (data: { symbol: string; price: number }) => {
      setPrices((prev) => ({ ...prev, [data.symbol]: data.price }));
    };
    socket.on('price_update', handlePriceUpdate);
    return () => { socket.off('price_update', handlePriceUpdate); };
  }, []);

  return (
    <LivePricesContext.Provider value={prices}>
      {children}
    </LivePricesContext.Provider>
  );
}

export function useLivePrices(): LivePrices {
  return useContext(LivePricesContext);
}
