import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  teams: string[];
}

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/matches");
        const found = res.data.matches.find((m: Match) => m.id === id);
        setMatch(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading match...</div>;
  }

  if (!match) {
    return <div className="p-6 text-red-500">Match not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back */}
      <Link
        to="/"
        className="text-blue-600 text-sm mb-4 inline-block hover:underline"
      >
        ← Back
      </Link>

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">{match.name}</h1>
        <p className="text-gray-600 text-sm">
          {match.matchType.toUpperCase()} · {match.venue}
        </p>
      </div>

      {/* Tabs (UI only, like Cricbuzz) */}
      <div className="flex gap-6 border-b mb-6 text-sm font-medium">
        <span className="border-b-2 border-green-600 pb-2 cursor-pointer">
          Scorecard
        </span>
        <span className="text-gray-500 cursor-pointer">Commentary</span>
        <span className="text-gray-500 cursor-pointer">Info</span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT — Status */}
        <div className="md:col-span-2 bg-white border rounded-md p-5">
          <h2 className="font-semibold mb-2">Match Status</h2>
          <p className="text-red-600 font-medium">{match.status}</p>

          <div className="mt-4 text-sm text-gray-700">
            <p>
              <span className="font-medium">Teams:</span>{" "}
              {match.teams.join(" vs ")}
            </p>
          </div>
        </div>

        {/* RIGHT — Info Box */}
        <div className="bg-white border rounded-md p-5 text-sm">
          <div className="mb-3">
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{match.date}</p>
          </div>

          <div>
            <p className="text-gray-500">Venue</p>
            <p className="font-medium">{match.venue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
