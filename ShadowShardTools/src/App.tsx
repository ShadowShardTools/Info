import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import CustomScrollbar from "./components/CustomScrollbar";

import Main from './pages/Main';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Products from './pages/Products';

const App: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    // Update header height when the window is resized
    const handleResize = () => {
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router basename="/Info">
      <div className="flex flex-col min-h-screen">
        <Header />
        <Cursor />
        <CustomScrollbar />

        {/* Main Content (grows to fill space) */}
        <main className="flex-grow" style={{ paddingTop: `${headerHeight}px` }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;