import { useEffect, useRef } from 'react';
import { createChart, ColorType, LineSeries, type IChartApi, type ISeriesApi } from 'lightweight-charts';
import { socket } from '../socket';
import { getHistory } from '../priceHistory';

interface PriceUpdate {
    symbol: string;
    price: number;
    timestamp: number;
}

export default function PriceChart({ symbol }: { symbol: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
            autoSize: true,
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#6b6b6b',
            },
            grid: {
                vertLines: { color: '#e8e8e8' },
                horzLines: { color: '#e8e8e8' },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
        });

        const series = chart.addSeries(LineSeries, {
            color: '#4a7dc4',
            lineWidth: 2,
        });

        chartRef.current = chart;
        seriesRef.current = series;

        return () => {
            chart.remove();
        };
    }, []);

    useEffect(() => {
        if (!seriesRef.current) return;

        const existingHistory = getHistory(symbol);
        seriesRef.current.setData(
            existingHistory.map((point) => ({
                time: point.time as any,
                value: point.value,
            }))
        );

        const handlePriceUpdate = (data: PriceUpdate) => {
            if (data.symbol !== symbol || !seriesRef.current) return;

            seriesRef.current.update({
                time: Math.floor(data.timestamp / 1000) as any,
                value: data.price,
            });
        };

        socket.on('price_update', handlePriceUpdate);

        return () => {
            socket.off('price_update', handlePriceUpdate);
        };
    }, [symbol]);

    return <div ref={containerRef} className="w-full h-full" />;
}