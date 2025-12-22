import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MatchCard from "../components/MatchCard";

const TeamDetails = () => {
  const { teamName } = useParams();
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.matches.filter((m: any) =>
          m.teams?.includes(teamName)
        );
        setMatches(filtered);
      });
  }, [teamName]);

  return (
    <div className="mt-6">
      <Link to="/teams" className="text-blue-600 text-sm">
        ← Back to Teams
      </Link>

      <h1 className="text-2xl font-bold mt-2">{teamName}</h1>

      <h2 className="text-lg font-semibold mt-6 mb-3">
        Recent Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-500">No matches found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
