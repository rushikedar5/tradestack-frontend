import Button from '../components/Button';
import FeatureBadge from '../components/FeatureBadge';
import Footer from '../components/Footer';
import landingImage from '../assets/landing.png';

export default function Landing() {
    return (
        <div className="min-h-screen bg-background">

            {/* Hero */}
            <section className="flex flex-col items-center text-center pt-24 pb-20 px-6">
                {/* Placeholder for product screenshot/mockup */}
                <div className="w-full max-w-3xl mb-16 overflow-hidden">
                    <img src={landingImage} alt="TradeStack dashboard preview" className="w-full h-auto" />
                </div>
                <h1 className="text-2xl font-light text-text-primary mb-4">
                    Trade in everything
                </h1>
                <p className="text-l text-text-muted mb-8 max-w-xl">
                    A platform to practice trading stocks, derivatives, and more — risk-free.
                </p>

                <a href="/signup">
                    <Button className="w-auto! px-6 py-2.5 text-l">
                        Sign up for free
                    </Button>
                </a>
            </section>

            {/* Trust section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 px-16 py-24 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-text-primary mb-10">
                        Built for learning, not gambling
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-text-primary mb-2">
                                Zero risk, real experience
                            </h3>
                            <p className="text-text-muted leading-relaxed">
                                Practice with virtual money against real, live market data — no real
                                capital at risk while you learn how markets actually move.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-text-primary mb-2">
                                No spam or gimmicks
                            </h3>
                            <p className="text-text-muted leading-relaxed">
                                No push notifications trying to bait you into trading more. Just a
                                clean platform that respects your pace.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-text-primary mb-2">
                                Built in the open
                            </h3>
                            <p className="text-text-muted leading-relaxed">
                                TradeStack is an open learning project — the entire system, from
                                order matching to portfolio accounting, is built transparently.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Orbiting feature cards */}
                <div className="relative h-105 flex items-center justify-center">
                    <div className="absolute w-95 h-95 rounded-full border border-border" />
                    <div className="absolute w-65 h-65 rounded-full border border-border" />

                    <FeatureBadge label="Realtime" name="Live Prices" className="absolute top-0 left-20" />
                    <FeatureBadge label="Orders" name="Instant Fills" className="absolute top-2 right-16" color="text-loss" />
                    <FeatureBadge label="Insights" name="AI Analysis" className="absolute bottom-24 right-4" />
                    <FeatureBadge label="Tracking" name="Portfolio" className="absolute bottom-0 left-28" />
                    <FeatureBadge label="Practice" name="Paper Trading" className="absolute top-1/2 -translate-y-1/2 left-0" />
                </div>
            </section>

            <section className="px-16 py-24 bg-surface border-t border-border">
                <h2 className="text-3xl font-bold text-text-primary text-center mb-16">
                    Everything you need to learn trading
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {[
                        { title: 'Live Market Data', desc: 'Real-time price feeds for stocks, tracked via live charts.' },
                        { title: 'Order Engine', desc: 'Market, limit, and stop-loss orders — executed like the real thing.' },
                        { title: 'Portfolio Analytics', desc: 'Track P&L, holdings, and performance over time.' },
                        { title: 'AI Insights', desc: 'Get plain-language explanations of market moves.' },
                    ].map((f) => (
                        <div key={f.title} className="bg-background border border-border rounded-lg p-6">
                            <h3 className="font-semibold text-text-primary mb-2">{f.title}</h3>
                            <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}