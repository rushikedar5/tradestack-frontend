import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import Input from '../components/Input';
import Button from '../components/Button';
import landingImage from '../assets/landing.png';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/signup', { email, password, name });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  function FeatureItem({ title, desc }: { title: string; desc: string }) {
    return (
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          <div className="w-4 h-4 rounded-full bg-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
          <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
        </div>
      </div>
    );
  }

  function StepItem({ number, title, desc }: { number: string; title: string; desc: string }) {
    return (
      <div className="text-center">
        <div className="w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center mx-auto mb-4">
          {number}
        </div>
        <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-16 py-20">
      {/* Headline */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Start paper trading, risk-free
        </h1>
        <p className="text-lg text-text-muted">
          Practice with virtual money and join a growing community of learners
        </p>
      </div>

      {/* Two-column section */}
      <div className="flex items-center justify-between gap-20 max-w-6xl mx-auto">
        {/* Left: product visual */}
        <div className="flex-1 hidden md:block">
          <img
            src={landingImage}
            alt="TradeStack dashboard preview"
            className="w-full h-auto rounded-lg border border-border shadow-sm"
          />
        </div>

        {/* Right: signup card */}
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-text-primary mb-1">
            Signup now
          </h2>
          <p className="text-sm text-text-muted mb-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="bg-red-500/10 text-loss text-sm px-3 py-2 rounded mb-4">
                {error}
              </p>
            )}

            <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit">Sign Up</Button>

            <p className="text-xs text-text-muted mt-4 text-center">
              By signing up, you agree to our{' '}
              <a href="#" className="text-accent hover:underline">terms</a>
              {' '}&{' '}
              <a href="#" className="text-accent hover:underline">privacy policy</a>
            </p>
          </form>
        </div>
      </div>

      {/* What you can do section */}
      <div className="max-w-5xl mx-auto mt-32">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-16">
          What you can do with TradeStack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <FeatureItem
            title="Live stocks"
            desc="Trade against real, live market data with zero real-money risk."
          />
          <FeatureItem
            title="Portfolio tracking"
            desc="See your holdings, P&L, and performance update in real time."
          />
          <FeatureItem
            title="Smart orders"
            desc="Place market, limit, and stop-loss orders — just like a real broker."
          />
          <FeatureItem
            title="AI insights"
            desc="Get plain-language explanations of why a stock is moving."
          />
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/signup">
            <Button className="w-auto! px-10">Explore Features</Button>
          </Link>
        </div>
      </div>

      {/* Steps section */}
      <div className="max-w-4xl mx-auto mt-32 mb-10">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-16">
          Steps to get started with TradeStack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <StepItem
            number="1"
            title="Create your account"
            desc="Sign up with your name, email, and a password — takes under a minute."
          />
          <StepItem
            number="2"
            title="Get virtual funds"
            desc="Every new account starts with virtual money to practice trading with."
          />
          <StepItem
            number="3"
            title="Start trading"
            desc="Place your first order and watch it execute against live prices."
          />
        </div>
      </div>
    </div>
  );
}