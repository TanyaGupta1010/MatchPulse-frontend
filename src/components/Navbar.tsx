import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MatchesMegaMenu from "./MatchesMegaMenu";
import logo from "/logo.png";

type Match = {
  id: string;
  name: string;
  matchType: string;
  status: string;
};

const Navbar = () => {
  const [showMatches, setShowMatches] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data.matches || []))
      .catch(() => setMatches([]));
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        
        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MatchPulse" className="h-8 w-8" />
          <span className="text-xl font-bold text-green-600">
            MatchPulse
          </span>
        </Link>

        {/* CENTER: NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">

          {/* MATCHES (MEGA MENU) */}
          <div
            className="relative"
            onMouseEnter={() => setShowMatches(true)}
            onMouseLeave={() => setShowMatches(false)}
          >
            <span className="hover:text-green-600 cursor-pointer">
              Matches
            </span>

            {showMatches && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[100vw]">
                <MatchesMegaMenu matches={matches} />
              </div>
            )}
          </div>

          {/* LIVE SCORES */}
          <Link
            to="/"
            className="hover:text-green-600"
          >
            Live Scores
          </Link>

          {/* SERIES */}
          <Link
            to="/series"
            className="hover:text-green-600"
          >
            Series
          </Link>

          {/* TEAMS */}
          <Link
            to="/teams"
            className="hover:text-green-600"
          >
            Teams
          </Link>
        </div>

        {/* RIGHT */}
        <div className="text-sm text-gray-400">
          Cricket Highlights
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
