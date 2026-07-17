import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import Input from '../components/Input';
import Button from '../components/Button';
import loginImage from '../assets/login.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
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

  return (
    <div className="min-h-screen bg-background px-16 py-20 flex items-center">
      <div className="flex items-center justify-between gap-20 max-w-6xl mx-auto w-full">
        {/* Left: product visual, same as Signup */}
        <div className="flex-1 hidden md:block">
          <img
            src={loginImage}
            alt="TradeStack dashboard preview"
            className="w-full h-auto rounded-lg border border-border shadow-sm"
          />
        </div>

        {/* Right: login form */}
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-text-primary mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-text-muted mb-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="bg-red-500/10 text-loss text-sm px-3 py-2 rounded mb-4">
                {error}
              </p>
            )}

            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

            <div className="flex justify-end mb-6 -mt-2">
              <a href="#" className="text-sm text-accent hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit">Log In</Button>
          </form>
        </div>
      </div>
    </div>
  );
}