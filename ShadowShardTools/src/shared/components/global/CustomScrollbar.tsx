import { useEffect } from 'react';

const CustomScrollbar: React.FC = () => {
  useEffect(() => {
    // Add the custom scrollbar styles to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      ::-webkit-scrollbar {
        width: 12px;
      }

      ::-webkit-scrollbar-track {
        background: #1e293b; /* slate-800 for dark theme compatibility */
        border-radius: 8px;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #2563eb, #1d4ed8); /* blue-600 to blue-700 gradient */
        border-radius: 8px;
        border: 2px solid #1e293b; /* border to create padding effect */
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #3b82f6, #2563eb); /* blue-500 to blue-600 for hover state */
      }

      /* Firefox support */
      * {
        scrollbar-width: thin;
        scrollbar-color: #2563eb #1e293b;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    // Clean up function
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // This component doesn't render anything visually
  return null;
};

export default CustomScrollbar;