import { useEffect, useState } from 'react';
import { socket } from '../socket';

interface PriceUpdate {
    symbol: string;
    price: number;
    timestamp: number;
}

interface PriceState {
    price: number;
    prevPrice: number;
    dayOpen: number;
}

interface WatchlistProps {
    selectedSymbol: string;
    onSelectSymbol: (symbol: string) => void;
    onBuyClick: (symbol: string, price: number) => void;
    onSellClick: (symbol: string, price: number) => void;
}

export default function Watchlist({ selectedSymbol, onSelectSymbol, onBuyClick, onSellClick }: WatchlistProps) {
    const [prices, setPrices] = useState<Record<string, PriceState>>({});

    useEffect(() => {
        const handlePriceUpdate = (data: PriceUpdate) => {
            setPrices((prev) => {
                const existing = prev[data.symbol];
                return {
                    ...prev,
                    [data.symbol]: {
                        price: data.price,
                        prevPrice: existing ? existing.price : data.price,
                        dayOpen: existing ? existing.dayOpen : data.price,
                    },
                };
            });
        };

        socket.on('price_update', handlePriceUpdate);

        return () => {
            socket.off('price_update', handlePriceUpdate);
        };
    }, []);

    const symbols = Object.keys(prices).sort();

    return (
        <div className="bg-surface border border-border rounded-lg shadow-sm h-full">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text-primary">Watchlist</h2>
                <span className="text-xs text-text-muted">{symbols.length} stocks</span>
            </div>

            {symbols.length === 0 ? (
                <p className="text-sm text-text-muted px-4 py-8 text-center">
                    Waiting for live prices...
                </p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-xs text-text-muted border-b border-border">
                            <th className="text-left font-medium px-4 py-2">Symbol</th>
                            <th className="text-right font-medium px-4 py-2">LTP</th>
                            <th className="text-right font-medium px-4 py-2">Chg</th>
                            <th className="text-right font-medium px-4 py-2">Chg%</th>
                            <th className="text-right font-medium px-4 py-2">Trade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {symbols.map((symbol) => {
                            const { price, prevPrice, dayOpen } = prices[symbol];
                            const isUp = price >= prevPrice;
                            const dayChange = price - dayOpen;
                            const dayChangePercent = dayOpen ? (dayChange / dayOpen) * 100 : 0;
                            const isSelected = symbol === selectedSymbol;

                            return (
                                <tr
                                    key={symbol}
                                    onClick={() => onSelectSymbol(symbol)}
                                    className={`border-b border-border last:border-0 cursor-pointer transition-colors ${isSelected ? 'bg-accent/10' : 'hover:bg-background'
                                        }`}
                                >
                                    <td className="px-4 py-2.5 font-medium text-text-primary">{symbol}</td>
                                    <td
                                        className={`px-4 py-2.5 text-right font-mono ${isUp ? 'text-profit' : 'text-loss'
                                            }`}
                                    >
                                        {price.toFixed(2)}
                                    </td>
                                    <td
                                        className={`px-4 py-2.5 text-right font-mono ${dayChange >= 0 ? 'text-profit' : 'text-loss'
                                            }`}
                                    >
                                        {dayChange >= 0 ? '+' : ''}
                                        {dayChange.toFixed(2)}
                                    </td>
                                    <td
                                        className={`px-4 py-2.5 text-right font-mono ${dayChangePercent >= 0 ? 'text-profit' : 'text-loss'
                                            }`}
                                    >
                                        {dayChangePercent >= 0 ? '+' : ''}
                                        {dayChangePercent.toFixed(2)}%
                                    </td>
                                    <td className="px-4 py-2.5 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onBuyClick(symbol, price);
                                                }}
                                                className="text-xs bg-accent text-white px-2.5 py-1 rounded hover:bg-blue-600 transition-colors"
                                            >
                                                Buy
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSellClick(symbol, price);
                                                }}
                                                className="text-xs bg-loss text-white px-2.5 py-1 rounded hover:bg-red-600 transition-colors"
                                            >
                                                Sell
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}