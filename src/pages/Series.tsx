import { useEffect, useState } from "react";
import SeriesCard from "../components/SeriesCard";

const SeriesPage = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/series")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch series");
        return res.json();
      })
      .then((data) => setSeries(data.series))
      .catch(() =>
        setError("Unable to load series. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredSeries = series.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="mt-6 text-gray-500">Loading series…</p>;
  }

  if (error) {
    return (
      <div className="mt-6 bg-red-50 text-red-600 p-4 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-4">Cricket Series</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search series..."
        className="w-full mb-6 px-4 py-2 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Empty */}
      {filteredSeries.length === 0 && (
        <p className="text-gray-500">No series found.</p>
      )}

      {/* Series Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredSeries.map((s) => (
          <SeriesCard
            key={s.id}
            id={s.id}
            name={s.name}
            startDate={s.startDate}
            endDate={s.endDate}
            matches={s.matches}
          />
        ))}
      </div>
    </div>
  );
};

export default SeriesPage;
