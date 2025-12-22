import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState<
    { name: string; matches: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch matches");
        return res.json();
      })
      .then((data) => {
        const teamCount: Record<string, number> = {};

        data.matches.forEach((match: any) => {
          match.teams.forEach((team: string) => {
            teamCount[team] = (teamCount[team] || 0) + 1;
          });
        });

        const teamList = Object.entries(teamCount).map(
          ([name, matches]) => ({ name, matches })
        );

        setTeams(teamList);
      })
      .catch(() =>
        setError("Unable to load teams. Please refresh.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="mt-6">Loading teams…</p>;

  if (error) {
    return (
      <div className="mt-6 bg-red-50 text-red-600 p-4 rounded">
        {error}
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <p className="mt-6 text-gray-500">
        No teams found.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <Link
            key={team.name}
            to={`/teams/${encodeURIComponent(team.name)}`}
            className="bg-white border rounded-lg p-4 hover:shadow transition"
          >
            <p className="font-medium">{team.name}</p>
            <p className="text-sm text-gray-600">
              Matches played: {team.matches}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
