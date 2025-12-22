import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const allTeams: string[] = [];

        data.matches.forEach((match: any) => {
          if (match.teams?.length === 2) {
            allTeams.push(match.teams[0]);
            allTeams.push(match.teams[1]);
          }
        });

        setTeams(Array.from(new Set(allTeams)));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="mt-6">Loading teams…</p>;

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {teams.map((team) => (
          <Link
            key={team}
            to={`/teams/${encodeURIComponent(team)}`}
            className="bg-white border rounded-md p-4 hover:shadow transition"
          >
            <p className="font-medium">{team}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
