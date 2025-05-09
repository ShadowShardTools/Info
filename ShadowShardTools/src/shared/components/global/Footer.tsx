import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../../Icons';

const Footer = () => {
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (yearElement) {
      yearElement.textContent = `2021-${currentYear}`;
    }
  }, []);

  return (
    <footer className="border-t border-blue-950">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo/Name section */}
          <div className="group">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-2xl font-bold text-blue-400">
                ShadowShardTools
              </h2>
            </div>
            <p className="text-gray-300 mb-6">Innovating digital experiences one line of code at a time.</p>

            {/* Social media icons */}
            <div className="flex space-x-4">

              <a
                href="https://assetstore.unity.com/publishers/46006"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-neutral-500 hover:shadow-lg hover:shadow-white/40 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Unity Asset Store Publisher Page"
              >
                <Icons.AssetStore />
              </a>

              <a
                href="https://github.com/ShadowShardTools"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit ShadowShardTools on GitHub"
              >
                <Icons.GitHub />
              </a>

              <a
                href="https://www.youtube.com/@shadowshardtools"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit ShadowShardTools on YouTube"
              >
                <Icons.Youtube />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-start lg:items-center md:items-center">
            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                <span className="relative z-10">Quick Links</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Main</Link></li>
                <li><Link to="/products" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Products</Link></li>
                <li><Link to="/projects" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Projects</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">About</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <Link to="/contact" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm mb-4 md:mb-0">
            &copy; <span id="year" className="text-stone-400"></span> ShadowShardTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;