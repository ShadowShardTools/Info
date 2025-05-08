import React, { memo } from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = memo(({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      active
        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
    }`}
  >
    {children}
  </button>
));

export default TabButton;