import { useState } from 'react';
import axios from 'axios';
import { api } from '../api/client';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/signup', { email, password, name });
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Create your account
          </h2>

          {error && (
            <p className="bg-red-500/10 text-loss text-sm px-3 py-2 rounded mb-4">
              {error}
            </p>
          )}

          <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
}