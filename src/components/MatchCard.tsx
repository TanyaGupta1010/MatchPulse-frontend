import { Link } from "react-router-dom";

export default function MatchCard({ match }: any) {
  return (
    <Link to={`/match/${match.id}`}>
      <div className="border rounded-md p-3 bg-white hover:shadow-sm transition cursor-pointer">
        <p className="text-xs text-gray-500 mb-1">
          {match.matchType?.toUpperCase()} • {match.venue}
        </p>

        <p className="text-sm font-semibold leading-snug">
          {match.name}
        </p>

        <p className="text-sm font-medium text-gray-700 mt-1">
          {match.status}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {match.date}
        </p>
      </div>
    </Link>
  );
}
