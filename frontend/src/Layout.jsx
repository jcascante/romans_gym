import logo from './assets/logo.jpg';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Layout({ children }) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary w-full max-w-7xl mx-auto dark:bg-neutral-900">
      {/* Header/Navbar */}
      <nav className="w-full flex items-center px-4 sm:px-8 py-4 bg-white shadow-md sticky top-0 z-10 dark:bg-neutral-800">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Roma's Gym Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary" />
          <span className="text-lg sm:text-xl font-bold text-primary">Roma's Gym</span>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="ml-auto sm:hidden p-2 rounded-lg border border-accent/30 bg-white dark:bg-neutral-700 dark:border-neutral-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-5 h-5 text-accent dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center ml-auto gap-6">
          <ul className="flex gap-6 font-semibold">
            <li><Link to="/" className={`${location.pathname === '/' ? 'text-primary' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}>Home</Link></li>
            {location.pathname === '/' && (
              <>
                <li><a href="#features" className="text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary">Features</a></li>
                <li><a href="#testimonials" className="text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary">Testimonials</a></li>
                <li><a href="#contact" className="text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary">Contact</a></li>
              </>
            )}
            <li><Link to="/templates" className={`${location.pathname === '/templates' ? 'text-primary' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}>Templates</Link></li>
            <li><Link to="/my-programs" className={`${location.pathname === '/my-programs' ? 'text-primary' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}>My Programs</Link></li>
          </ul>
          
          {/* Dark Mode Toggle */}
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-accent/30 bg-white dark:bg-neutral-700 dark:border-neutral-600 hover:bg-accent/5 dark:hover:bg-neutral-600 transition-all duration-200"
            onClick={() => setDarkMode(dm => !dm)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <>
                <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline text-sm font-medium text-slate-400">Dark</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
                <span className="hidden sm:inline text-sm font-medium text-amber-600">Light</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-neutral-800 border-t border-accent/20 dark:border-neutral-700 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-lg font-semibold ${location.pathname === '/' ? 'text-primary bg-primary/10' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {location.pathname === '/' && (
              <>
                <a href="#features" className="block px-3 py-2 rounded-lg font-semibold text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#testimonials" className="block px-3 py-2 rounded-lg font-semibold text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                <a href="#contact" className="block px-3 py-2 rounded-lg font-semibold text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </>
            )}
            <Link 
              to="/templates" 
              className={`block px-3 py-2 rounded-lg font-semibold ${location.pathname === '/templates' ? 'text-primary bg-primary/10' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/my-programs" 
              className={`block px-3 py-2 rounded-lg font-semibold ${location.pathname === '/my-programs' ? 'text-primary bg-primary/10' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Programs
            </Link>
            
            {/* Mobile Dark Mode Toggle */}
            <button
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-accent/30 bg-white dark:bg-neutral-700 dark:border-neutral-600 hover:bg-accent/5 dark:hover:bg-neutral-600 transition-all duration-200"
              onClick={() => setDarkMode(dm => !dm)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <>
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-slate-400">Dark Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                  </svg>
                  <span className="text-sm font-medium text-amber-600">Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto px-4 py-8 max-w-6xl">{children}</main>
      {/* Footer */}
      <footer id="contact" className="w-full bg-accent text-secondary py-8 flex flex-col items-center mt-auto dark:bg-neutral-800 dark:text-accent">
        <div className="mb-2 font-semibold text-center px-4">123 Fitness Ave, City, Country</div>
        <div className="mb-2 text-center px-4 text-sm sm:text-base">Phone: (123) 456-7890 | Email: info@romasgym.com</div>
        <div className="text-sm">&copy; {new Date().getFullYear()} Roma's Gym. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Layout; 