import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { getMatches } from "../services/matchService";

export default function Home() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches()
      .then((data) => {
        console.log("API DATA:", data);
        setMatches(data?.matches || []);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="mt-6 text-center">Loading matches...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Live & Recent Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-500">No matches found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
