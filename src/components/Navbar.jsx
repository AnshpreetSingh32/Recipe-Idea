import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    // Navigate to home, preserving last search via URL if available
    const lastQuery = sessionStorage.getItem("lastQuery") || "";
    if (lastQuery) {
      navigate(`/?q=${encodeURIComponent(lastQuery)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/* Left: App name */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleHomeClick}
              className="text-xl font-semibold tracking-tight text-gray-900 hover:text-gray-700"
            >
              RecipeIdeas
            </button>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6 text-sm">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900"
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