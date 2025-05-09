import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./shared/components/global/Header";
import Footer from "./shared/components/global/Footer";
import Cursor from "./shared/components/global/Cursor";
import CustomScrollbar from "./shared/components/global/CustomScrollbar";

import Main from './pages/Main';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Products from './pages/Products';

const AppContent: React.FC<{ headerHeight: number }> = ({ headerHeight }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  // Apply overflow hidden to body on main page
  useEffect(() => {
    if (isMainPage) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMainPage]);

  return (
    <>
      <Cursor />
      <CustomScrollbar />
      <main className="flex-grow" style={{ paddingTop: `${headerHeight}px` }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
      {!isMainPage && <Footer />}
    </>
  );
};


const App: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleResize = () => {
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router basename="/">
      <div className="flex flex-col min-h-screen">
        <Header />
        <AppContent headerHeight={headerHeight} />
      </div>
    </Router>
  );
};

export default App;
