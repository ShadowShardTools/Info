import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Main', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Projects', href: '/projects' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">L</div>
              <span className="ml-2 text-xl font-bold text-gray-800">Logo</span>
            </div>
          </div>

          {/* Desktop Navigation - Always visible on medium screens and above */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors duration-200 lg:px-3"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button - Only visible on small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only appears on small screens when menu is toggled */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}