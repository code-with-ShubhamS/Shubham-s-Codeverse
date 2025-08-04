import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Playground", path: "/playground" },
    { name: "Blog", path: "/blog" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className=" text-white sticky top-0 z-50  backdrop-blur-md  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:cursor-pointer">
              <img
                src="logo.png"
                alt="logo"
                className="w-[3rem] h-[3rem]"
                onClick={() => (window.location.href = "/")}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `p-2 font-bold rounded-md text-sm transition-all duration-300 relative group ${
                    isActive
                      ? ""
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {/* Active indicator */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></span>
                    {/* Hover effect */}
                    <span className="absolute inset-0 bg-gray-800 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-200 -z-10"></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-180 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                  size={24}
                />
                <X
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-0 opacity-100"
                      : "rotate-180 opacity-0"
                  }`}
                  size={24}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 mb-4 backdrop-blur-md z-[999]">
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-all duration-300 transform ${
                    isActive
                      ? "text-white bg-gray-800 translate-x-2"
                      : "text-gray-300 hover:text-white hover:bg-gray-800 hover:translate-x-1"
                  }`
                }
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen
                    ? "slideInLeft 0.3s ease-out forwards"
                    : "none",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span className="flex items-center">
                    {isActive && (
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                    )}
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}
      </style>
    </header>
  );
}
// ...existing code...
