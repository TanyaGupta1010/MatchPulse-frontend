import { Link } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  matches: number;
}

const SeriesCard = ({ id, name, startDate, endDate, matches }: Props) => {
  return (
    <Link to={`/series/${id}`}>
      <div className="bg-white border rounded-lg p-4 hover:shadow transition cursor-pointer">
        <h3 className="font-semibold text-lg">{name}</h3>

        <p className="text-sm text-gray-600 mt-1">
          {startDate} – {endDate}
        </p>

        <p className="text-sm text-gray-700 mt-2">
          {matches} matches
        </p>
      </div>
    </Link>
  );
};

export default SeriesCard;
