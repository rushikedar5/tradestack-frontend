import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/LandingPage';
import Signup from './pages/Signup';
import Navbar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;