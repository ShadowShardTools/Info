import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    useEffect(() => {
        const year = new Date().getFullYear();
        const yearElement = document.getElementById('year');

        if (yearElement) {
            yearElement.textContent = year.toString();
        }
    }, []);

    return (
        <footer className="relative border-t">
            {/* Main footer content */}
            <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-8 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo/Name section */}
                    <div className="group">
                        <div className="flex items-center space-x-2 mb-6">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                ShadowShardTools
                            </h2>
                        </div>
                        <p className="text-gray-300 mb-6">Innovating digital experiences one line of code at a time.</p>

                        {/* Social media icons */}
                        <div className="flex space-x-4">
                            <a href="https://github.com/ShadowShardTools" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@shadowshardtools" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
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
                          <li><Link to="/" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Home</Link></li>
                          <li><Link to="/projects" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Projects</Link></li>
                          <li><Link to="/products" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Products</Link></li>
                          <li><Link to="/about" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">About</Link></li>
                        </ul>
                      </div>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-300">Email</p>
                                    <a href="mailto:shadowshardtools@gmail.com" className="text-white hover:text-blue-400">shadowshardtools@gmail.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; <span id="year" className="text-blue-400"></span> ShadowShardTools. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
