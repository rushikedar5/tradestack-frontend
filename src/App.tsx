import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/LandingPage';
import Signup from './pages/Signup';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Orders from './pages/Orders';
import Holdings from './pages/Holdings';
import Positions from './pages/Postions';
import Funds from './pages/Funds';

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
          <Route path="orders" element={
          <ProtectedRoute>
              <Orders />
          </ProtectedRoute>
          }/>
          <Route path="holdings" element={
          <ProtectedRoute>
              <Holdings />
          </ProtectedRoute>
          }/>
          <Route path="positions" element={
          <ProtectedRoute>
              <Positions />
          </ProtectedRoute>
          }/>
          <Route path="funds" element={
          <ProtectedRoute>
              <Funds />
          </ProtectedRoute>
          }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;