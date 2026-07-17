import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold text-text-primary">
        Welcome to your dashboard 🎉
      </h1>
      <Button onClick={handleLogout} className="w-auto! px-6">Logout</Button>
    </div>
  );
}