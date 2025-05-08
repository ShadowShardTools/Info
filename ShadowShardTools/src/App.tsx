import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./shared/components/global/Header"
import Footer from "./shared/components/global/Footer"
import Cursor from "./shared/components/global/Cursor"
import CustomScrollbar from "./shared/components/global/CustomScrollbar"

import Main from './pages/Main';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
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
    <Router basename="/">
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
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;