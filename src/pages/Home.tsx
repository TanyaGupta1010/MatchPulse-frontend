import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { getMatches } from "../services/matchService";

interface Match {
  id: string;
  name: string;
  venue: string;
  status: string;
  date: string;
  teams: string[];
}

const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await getMatches();
        setMatches(res.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = matches.filter((match) =>
    match.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Live & Recent Matches</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search matches..."
        className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading matches...</p>
      )}

      {/* Empty */}
      {!loading && filteredMatches.length === 0 && (
        <p className="text-gray-500">No matches found</p>
      )}

      {/* Match Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default Home;
