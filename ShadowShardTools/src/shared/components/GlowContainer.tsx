import React from 'react';

interface GlowContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A container component that adds a neon glow effect to its children
 */
const GlowContainer: React.FC<GlowContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative group h-full ${className}`}>
      {/* Neon glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-10 group-hover:opacity-70 transition-opacity duration-500"></div>

      {/* Content with z-index to appear above the glow */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default GlowContainer;