import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMatches } from "../services/matchService";

interface Match {
  id: string;
  name: string;
  teams: string[];
}

const Teams = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await getMatches();
      const allTeams = new Set<string>();

      res.matches.forEach((match: Match) => {
        match.teams.forEach((team) => allTeams.add(team));
      });

      setTeams(Array.from(allTeams));
      setLoading(false);
    };

    fetchTeams();
  }, []);

  if (loading) return <p className="p-6">Loading teams...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Teams</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Link
            key={team}
            to={`/teams/${encodeURIComponent(team)}`}
            className="border rounded-lg p-3 hover:bg-gray-50"
          >
            {team}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
