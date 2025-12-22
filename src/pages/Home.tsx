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

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await getMatches();
        setMatches(res.matches || []);
      } catch (err) {
        setError("Failed to load matches. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = matches.filter((match) =>
    match.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleMatches = filteredMatches.slice(0, visible);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">
        Live & Recent Matches
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search matches..."
        className="w-full mb-6 px-4 py-2 border rounded-md"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisible(ITEMS_PER_PAGE);
        }}
      />

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading matches…</p>}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredMatches.length === 0 && (
        <p className="text-gray-500">No matches found.</p>
      )}

      {/* Match Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {visibleMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {/* Load More */}
      {!loading &&
        visible < filteredMatches.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisible((v) => v + ITEMS_PER_PAGE)}
              className="px-6 py-2 border rounded-md hover:bg-gray-100"
            >
              Load More
            </button>
          </div>
        )}
    </div>
  );
};

export default Home;
