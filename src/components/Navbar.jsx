/**
 * Navbar Component
 * 
 * A responsive navigation bar component that includes the app logo, title, and navigation links.
 * Features a sticky header with blur effect and handles navigation state cleanup on home navigation.
 */

import {NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Fresh home: clear any stored state and navigate to clean homepage
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    navigate("/");
  };

  return (
    <nav className="border-b border-gray-100 bg-[#f3f8f8]/95 backdrop-blur-sm sticky top-0 z-50 shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/* Left: Logo + App name */}
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleHomeClick} className="shrink-0">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={logo} alt="Recipe Ideas logo" className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={handleHomeClick}
              className="text-xl font-semibold tracking-tight hover:text-orange-500  transition-colors duration-200"
            >
              What’s Cooking?
            </button>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-8 text-md">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive ? "text-orange-500 font-medium scale-120" : "hover:scale-110"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive ? "text-orange-500 font-medium scale-120" : " hover:scale-110"
                }`
              }
            >
              Help / FAQ
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;