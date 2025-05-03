import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const orbOffset = 64;   // 128 / 2
      const ringOffset = 12;   // 24 / 2

      const x = e.clientX;
      const y = e.clientY;

      orbRef.current?.style.setProperty("left", `${x - orbOffset}px`);
      orbRef.current?.style.setProperty("top", `${y - orbOffset}px`);

      ringRef.current?.style.setProperty("left", `${x - ringOffset}px`);
      ringRef.current?.style.setProperty("top", `${y - ringOffset}px`);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Orb */}
      <div
        ref={orbRef}
        className="fixed w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-2xl pointer-events-none z-10"
        style={{ left: 0, top: 0 }}
      />

      {/* Always-On Animated Ring */}
      <div
        ref={ringRef}
        className={`fixed w-6 h-6 rounded-full border-2 pointer-events-none z-20 transition-transform duration-200 ease-out
          ${isActive ? "scale-150 border-blue-400" : "scale-100 border-white"}
        `}
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default Cursor;