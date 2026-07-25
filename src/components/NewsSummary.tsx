import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Loader } from 'lucide-react';

interface Props {
  symbol: string;
}

export default function NewsSummary({ symbol }: Props) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setSummary('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/ai/news-summary/${symbol}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setSummary((prev) => prev + decoder.decode(value));
      }
    } catch (err) {
      setSummary('Failed to load summary.');
    } finally {
      setLoading(false);
    }
  };

  const sentiment = summary.includes('BULLISH')
    ? 'BULLISH'
    : summary.includes('BEARISH')
    ? 'BEARISH'
    : summary.includes('NEUTRAL')
    ? 'NEUTRAL'
    : null;

  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-text-primary">AI News Summary</p>
          {sentiment === 'BULLISH' && (
            <span className="flex items-center gap-1 text-xs text-profit bg-profit/10 px-2 py-0.5 rounded">
              <TrendingUp size={11} /> Bullish
            </span>
          )}
          {sentiment === 'BEARISH' && (
            <span className="flex items-center gap-1 text-xs text-loss bg-loss/10 px-2 py-0.5 rounded">
              <TrendingDown size={11} /> Bearish
            </span>
          )}
          {sentiment === 'NEUTRAL' && (
            <span className="flex items-center gap-1 text-xs text-text-muted bg-border px-2 py-0.5 rounded">
              <Minus size={11} /> Neutral
            </span>
          )}
        </div>
        <button
          onClick={fetchSummary}
          disabled={loading}
          className="text-xs text-accent hover:underline disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <Loader size={11} className="animate-spin" /> Analyzing...
            </span>
          ) : summary ? 'Refresh' : `Analyze ${symbol}`}
        </button>
      </div>

      {summary && (
        <pre className="text-xs text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
          {summary}
        </pre>
      )}

      {!summary && !loading && (
        <p className="text-xs text-text-muted text-center py-4">
          Click "Analyze {symbol}" to get AI-powered news insights
        </p>
      )}
    </div>
  );
}