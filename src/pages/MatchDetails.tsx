import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  teams: string[];
  venue: string;
  date: string;
}

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/matches");
        const data = await res.json();

        const found = data.matches.find((m: Match) => m.id === id);
        setMatch(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return <p className="mt-6 text-gray-500">Loading match details…</p>;
  }

  if (!match) {
    return <p className="mt-6 text-red-500">Match not found.</p>;
  }

  return (
    <div className="mt-6">
      {/* Back */}
      <Link to="/" className="text-blue-600 text-sm hover:underline">
        ← Back
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold mt-2">{match.name}</h1>
      <p className="text-gray-600">
        {match.matchType.toUpperCase()} • {match.venue}
      </p>

      {/* Tabs */}
      <div className="flex gap-6 mt-6 border-b">
        <span className="pb-2 border-b-2 border-green-600 font-medium">
          Scorecard
        </span>
        <span className="pb-2 text-gray-500">Commentary</span>
        <span className="pb-2 text-gray-500">Info</span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left Card */}
        <div className="md:col-span-2 bg-white border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Match Status</h2>
          <p className="text-red-600 font-medium">{match.status}</p>

          <div className="mt-4">
            <p className="text-sm text-gray-600">Teams</p>
            <p className="font-medium">
              {match.teams[0]} vs {match.teams[1]}
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Date</p>
          <p className="font-medium">{match.date}</p>

          <p className="text-sm text-gray-600 mt-4">Venue</p>
          <p className="font-medium">{match.venue}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
