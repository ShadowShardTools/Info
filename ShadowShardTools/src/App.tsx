import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCarousel from './components/ProductCarousel';

function App() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (orbRef.current) {
        // Offset by half the orb size to center it on the cursor
        const offset = 128; // half of 256px (orb size)
        orbRef.current.style.left = `${e.clientX - offset}px`;
        orbRef.current.style.top = `${e.clientY - offset}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="pt-20 relative bg-gradient-to-br from-gray-950 to-slate-800 text-white overflow-hidden">
        {/* Orb follows cursor */}
        <div
          ref={orbRef}
          className="orb fixed w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-3xl pointer-events-none z-10"
          style={{ left: 0, top: 0 }}
        />
        <ProductCarousel />
        <Footer />
      </div>
    </>
  );
}

export default App;
