import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrbCursor from "./components/cursor/OrbCursor";

import Main from './pages/Main';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Products from './pages/Products';

function App() {
  return (
    <Router basename="/Info">
      <Header />
      <OrbCursor />
      <div className="pt-20 relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
