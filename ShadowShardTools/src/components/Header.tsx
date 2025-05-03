import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <header className="text-white bg-gradient-to-b from-slate-800 to-slate-900 shadow-md fixed w-full top-0 z-10 border-b border-blue-950/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/Info/favicon.png"
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-2 text-xl font-bold">ShadowShardTools</span>
          </div>

          {/* Desktop Navigation - Always visible on medium screens and above */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative inline-block px-2 py-2 text-sm font-medium transition-colors duration-200 lg:px-3 text-white hover:text-blue-600 group"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>

            ))}
          </nav>

          {/* Mobile menu button - Only visible on small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="hover:text-blue-600 focus:outline-none"
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
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}