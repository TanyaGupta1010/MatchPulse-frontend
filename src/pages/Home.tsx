import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import LiveMatchCard from "../components/LiveMatchCard";
import { getMatches } from "../services/matchService";

export default function Home() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches()
      .then((data) => {
        setMatches(data?.matches || []);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setMatches([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="mt-6 text-center text-gray-500">
        Loading matches...
      </p>
    );
  }

  // 🔴 LIVE MATCHES (real logic)
  const liveMatches = matches.filter(
    (m) => m.matchStarted && !m.matchEnded
  );

  // 📃 RECENT MATCHES
  const recentMatches = matches.filter(
    (m) => !liveMatches.includes(m)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      
      {/* 🔴 LIVE MATCHES SECTION */}
      {liveMatches.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">
            Live Matches
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {liveMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 text-sm text-gray-400">
          No live matches right now
        </div>
      )}

      {/* 📃 RECENT MATCHES SECTION */}
      <h2 className="text-lg font-semibold mb-4">
        Live & Recent Matches
      </h2>

      {recentMatches.length === 0 ? (
        <p className="text-gray-500">No matches found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
