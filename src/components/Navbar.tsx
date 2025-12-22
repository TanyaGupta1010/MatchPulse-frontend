import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-8">
        <NavLink
          to="/"
          className="text-xl font-bold text-green-600"
        >
          MatchPulse
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-medium border-b-2 border-green-600 pb-3"
              : "text-gray-700 hover:text-green-600"
          }
        >
          Live Scores
        </NavLink>

        <NavLink
          to="/series"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-medium border-b-2 border-green-600 pb-3"
              : "text-gray-700 hover:text-green-600"
          }
        >
          Series
        </NavLink>

        <NavLink
          to="/teams"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-medium border-b-2 border-green-600 pb-3"
              : "text-gray-700 hover:text-green-600"
          }
        >
          Teams
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
