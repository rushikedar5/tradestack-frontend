import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/LandingPage';
import Signup from './pages/Signup';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="dashboard" element={
          <ProtectedRoute>
              <Dashboard />
          </ProtectedRoute>
          }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;