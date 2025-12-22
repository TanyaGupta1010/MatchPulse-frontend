import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/public/logo.png"
            alt="MatchPulse Logo"
            className="h-8 w-8"
          />
          <span className="text-green-600 font-bold text-xl">
            MatchPulse
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-green-600">
            Live Scores
          </Link>
          <Link to="/series" className="hover:text-green-600">
            Series
          </Link>
          <Link to="/teams" className="hover:text-green-600">
            Teams
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
