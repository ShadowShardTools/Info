import { useEffect, useRef } from "react";

const OrbCursor = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (orbRef.current) {
        const offset = 128;
        orbRef.current.style.left = `${e.clientX - offset}px`;
        orbRef.current.style.top = `${e.clientY - offset}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={orbRef}
      className="orb fixed w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-3xl pointer-events-none z-10"
      style={{ left: 0, top: 0 }}
    />
  );
};

export default OrbCursor;
