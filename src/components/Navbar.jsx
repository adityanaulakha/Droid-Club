import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Teams", path: "/teams" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4">
      <nav className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mx-4 md:mx-0 w-full max-w-3xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              {/* <span className="text-lg font-bold text-white">Droid Club</span> */}
              <img src="/DroidWhite.png" alt="Droid Club Logo" className="h-auto w-8 "/>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -ml-1 -left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-purple-600 rounded-full"></span>
                  )}
              </Link>
            ))}
          </div>
          
          {/* Droid Club Title */}
          <Link to="/" className="flex items-center">
              <span className="text-lg font-bold text-white">DROID</span>
        </Link>
  
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-5 w-5`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-5 w-5`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
  <div className="absolute top-full left-0 w-full z-50 bg-black/90 shadow-lg rounded-b-lg">
    
    {/* Close Button
    <button
      onClick={() => setIsOpen(false)}
      className="absolute top-3 right-5 text-white text-2xl hover:text-gray-400"
    >
      ✕
    </button> */}

    {/* Menu Items */}
    <div className="flex flex-col items-center py-5 space-y-4">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`block px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 ${
            location.pathname === link.path
              ? "text-white bg-purple-900/40"
              : "text-gray-300 hover:text-white hover:bg-purple-900/20"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  </div>
)}

      </nav>
    </div>
  );
}