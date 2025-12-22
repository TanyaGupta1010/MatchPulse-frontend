import { Link } from "react-router-dom";

const MatchCard = ({ match }: any) => {
  return (
    <Link to={`/match/${match.id}`}>
      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition">
        <h2 className="font-medium">{match.name}</h2>
        <p className="text-sm text-gray-600">{match.venue}</p>

        <p className="text-red-600 font-medium mt-2">
          {match.status}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {match.date}
        </p>
      </div>
    </Link>
  );
};

export default MatchCard;
