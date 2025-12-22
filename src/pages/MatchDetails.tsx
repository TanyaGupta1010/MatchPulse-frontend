import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Match = {
  id: string;
  name: string;
  status: string;
  venue: string;
  date: string;
  matchType: string;
  teams: string[];
};

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [activeTab, setActiveTab] = useState<
    "scorecard" | "commentary" | "info"
  >("scorecard");

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const found = data.matches.find((m: Match) => m.id === id);
        setMatch(found);
      });
  }, [id]);

  if (!match) {
    return <div className="p-6 text-gray-600">Loading match details...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back */}
      <Link to="/" className="text-blue-600 text-sm mb-4 inline-block">
        ← Back
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold">{match.name}</h1>
      <p className="text-gray-500 mt-1">
        {match.matchType.toUpperCase()} · {match.venue}
      </p>

      {/* Tabs */}
      <div className="flex gap-6 mt-6 border-b">
        {["scorecard", "commentary", "info"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 capitalize ${
              activeTab === tab
                ? "border-b-2 border-green-600 text-green-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === "scorecard" && (
            <div className="bg-white border rounded-lg p-4">
              <h2 className="font-semibold mb-2">Match Status</h2>
              <p className="text-red-600 font-medium">{match.status}</p>
              <p className="mt-3 text-sm">
                {match.teams[0]} vs {match.teams[1]}
              </p>
            </div>
          )}

          {activeTab === "commentary" && (
            <div className="bg-white border rounded-lg p-4 space-y-2 text-sm">
              <p>🟢 Match started at {match.venue}</p>
              <p>🔔 {match.status}</p>
              <p>📅 Played on {match.date}</p>
              <p>🏏 Teams: {match.teams.join(" vs ")}</p>
            </div>
          )}

          {activeTab === "info" && (
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
          )}

          {/* Team Comparison */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Team Comparison</h3>
            <p className="text-sm">
              {match.teams[0]} vs {match.teams[1]}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Match Format: {match.matchType.toUpperCase()}
            </p>
            <p className="text-gray-500 text-sm">
              Venue: {match.venue}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4 text-sm">
            <h3 className="font-semibold mb-2">Match Facts</h3>
            <p>📍 Venue: {match.venue}</p>
            <p>📅 Date: {match.date}</p>
            <p>🏏 Format: {match.matchType.toUpperCase()}</p>
          </div>

          <div className="bg-white border rounded-lg p-4 text-sm">
            <h3 className="font-semibold mb-2">Did You Know?</h3>
            <p className="text-gray-600">
              This match is part of an international series. Detailed
              ball-by-ball data may not be available for all matches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;