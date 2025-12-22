import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MatchCard from "../components/MatchCard";

const SeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    // fetch series
    fetch("http://localhost:5000/api/series")
      .then((res) => res.json())
      .then((data) => {
        const found = data.series.find((s: any) => s.id === id);
        setSeries(found);
      });

    // fetch matches
    fetch("http://localhost:5000/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.matches.filter(
          (m: any) => m.series_id === id
        );
        setMatches(filtered);
      });
  }, [id]);

  if (!series) {
    return <p className="mt-6 text-gray-500">Loading series...</p>;
  }

  return (
    <div className="mt-6">
      <Link to="/series" className="text-blue-600 text-sm">
        ← Back to Series
      </Link>

      <h1 className="text-2xl font-bold mt-2">{series.name}</h1>
      <p className="text-gray-600">
        {series.startDate} – {series.endDate}
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">
        Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-500">No matches available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeriesDetails;
