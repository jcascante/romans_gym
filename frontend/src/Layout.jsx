import logo from './assets/logo.jpg';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Layout({ children }) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary w-[1050px] mx-auto dark:bg-neutral-900">
      {/* Header/Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-10 dark:bg-neutral-800">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Roma's Gym Logo" className="w-10 h-10 rounded-full border-2 border-primary" />
          <span className="text-xl font-bold text-primary">Roma's Gym</span>
        </div>
        <ul className="flex gap-6 font-semibold">
          <li><Link to="/" className={`${location.pathname === '/' ? 'text-primary' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}>Home</Link></li>
          <li><a href="#features" className="text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary">Features</a></li>
          <li><Link to="/templates" className={`${location.pathname === '/templates' ? 'text-primary' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}>Templates</Link></li>
          <li><Link to="/my-programs" className={`${location.pathname === '/my-programs' ? 'text-primary' : 'text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary'}`}>My Programs</Link></li>
          <li><a href="#testimonials" className="text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary">Testimonials</a></li>
          <li><a href="#contact" className="text-accent hover:text-primary dark:text-gray-100 dark:hover:text-primary">Contact</a></li>
        </ul>
        {/* Dark mode toggle */}
        <button
          className="ml-6 p-2 rounded-full border border-accent bg-white dark:bg-neutral-700 dark:border-neutral-600 hover:bg-accent/10 dark:hover:bg-neutral-600 transition"
          onClick={() => setDarkMode(dm => !dm)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 4.95l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>
      </nav>
      {/* Main Content */}
      <main className="flex-1 w-full mx-auto px-4 py-8 max-w-[1000px]">{children}</main>
      {/* Footer */}
      <footer id="contact" className="w-full bg-accent text-secondary py-8 flex flex-col items-center mt-auto dark:bg-neutral-800 dark:text-accent">
        <div className="mb-2 font-semibold">123 Fitness Ave, City, Country</div>
        <div className="mb-2">Phone: (123) 456-7890 | Email: info@romasgym.com</div>
        <div className="text-sm">&copy; {new Date().getFullYear()} Roma's Gym. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Layout; 