import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMatches } from "../services/matchService";
import MatchCard from "../components/MatchCard";

interface Match {
  id: string;
  name: string;
  teams: string[];
}

const TeamDetails = () => {
  const { teamName } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMatches = async () => {
      const res = await getMatches();
      const filtered = res.matches.filter((m: Match) =>
        m.teams.includes(teamName || "")
      );
      setMatches(filtered);
      setLoading(false);
    };

    fetchTeamMatches();
  }, [teamName]);

  if (loading) return <p className="p-6">Loading team details...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Link to="/teams" className="text-blue-500 text-sm">
        ← Back to Teams
      </Link>

      <h1 className="text-2xl font-semibold mt-2 mb-4">
        {teamName}
      </h1>

      {matches.length === 0 ? (
        <p className="text-gray-500">No matches found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match as any} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
