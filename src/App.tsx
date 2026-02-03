import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Reports from './Pages/Reports';
import Recommendations from './Pages/Recommendations';
import About from './Pages/About';
import Navbar from './Components/Navbar.tsx';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* The menu will always be on top */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
