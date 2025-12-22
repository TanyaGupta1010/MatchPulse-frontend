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
  const [tab, setTab] = useState<"scorecard" | "commentary" | "info">(
    "scorecard"
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const found = data.matches.find((m: Match) => m.id === id);
        setMatch(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="mt-6">Loading match…</p>;
  if (!match) return <p className="mt-6">Match not found</p>;

  return (
    <div className="mt-6">
      <Link to="/" className="text-blue-600 text-sm">
        ← Back
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold mt-2">{match.name}</h1>
      <p className="text-gray-600">
        {match.matchType.toUpperCase()} • {match.venue}
      </p>

      {/* Tabs */}
      <div className="flex gap-6 mt-6 border-b">
        {["scorecard", "commentary", "info"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`pb-2 capitalize ${
              tab === t
                ? "border-b-2 border-green-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tab === "scorecard" && <Scorecard match={match} />}
        {tab === "commentary" && <Commentary match={match} />}
        {tab === "info" && <Info match={match} />}
      </div>
    </div>
  );
};

export default MatchDetails;

//
// ⬇️⬇️⬇️ TAB COMPONENTS (SAME FILE) ⬇️⬇️⬇️
//

const Scorecard = ({ match }: { match: Match }) => {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="font-semibold mb-2">Match Status</h2>
      <p className="text-red-600 font-medium">{match.status}</p>

      <p className="mt-3 text-sm">
        {match.teams[0]} vs {match.teams[1]}
      </p>
    </div>
  );
};

const Commentary = ({ match }: { match: Match }) => {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-2 text-sm">
      <p>🟢 Match started at {match.venue}</p>
      <p>🔔 {match.status}</p>
      <p>📅 Played on {match.date}</p>
      <p>🏏 Teams: {match.teams.join(" vs ")}</p>
    </div>
  );
};

const Info = ({ match }: { match: Match }) => {
  return (
    <div className="bg-white border rounded-lg p-4 text-sm space-y-2">
      <p>
        <span className="text-gray-500">Match:</span> {match.name}
      </p>
      <p>
        <span className="text-gray-500">Format:</span>{" "}
        {match.matchType.toUpperCase()}
      </p>
      <p>
        <span className="text-gray-500">Venue:</span> {match.venue}
      </p>
      <p>
        <span className="text-gray-500">Date:</span> {match.date}
      </p>
    </div>
  );
};
