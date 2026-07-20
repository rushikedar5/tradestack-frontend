# TradeStack — Frontend

React + TypeScript + Vite frontend for the TradeStack paper trading platform.

> See [backend README](../backend/README.md) for full project overview, architecture, and learning log.

---

## Tech Stack

- **React 19 + TypeScript** — UI layer
- **Vite** — dev server & bundler
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — styling
- **Socket.IO client** — real-time live price feed
- **Axios** — REST API calls
- **Lightweight Charts** — candlestick/line price charts
- **Lucide React + React Icons** — icon sets

---

## Pages

| Route | Component | Auth Required |
|-------|-----------|---------------|
| `/` | `LandingPage` | No |
| `/signup` | `Signup` | No |
| `/login` | `Login` | No |
| `/dashboard` | `Dashboard` | ✅ Yes |
| `/orders` | `Orders` | ✅ Yes |
| `/holdings` | `Holdings` | ✅ Yes |
| `/positions` | `Positions` | ✅ Yes |
| `/funds` | `Funds` | ✅ Yes |

---

## Key Components

- **`WatchList`** — live-updating stock prices via `LivePricesContext`
- **`OrderModal`** — buy/sell dialog with quantity, order type, and price
- **`PriceChart`** — candlestick/line chart (Lightweight Charts)
- **`NavBar`** — navigation with auth state awareness
- **`ProtectedRoute`** — redirects unauthenticated users to `/login`
- **`LivePricesContext`** — Socket.IO consumer, shares live prices app-wide

---

## Running Locally

```bash
npm install
npm run dev
# App: http://localhost:5173
```

Make sure the backend is running on `http://localhost:3000` first.

---

## Environment

No `.env` needed for development — the backend URL and Socket.IO endpoint are set to `http://localhost:3000` by default.

