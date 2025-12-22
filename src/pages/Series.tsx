import { useEffect, useState } from "react";
import SeriesCard from "../components/SeriesCard";

const SeriesPage = () => {
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/series")
      .then((res) => res.json())
      .then((data) => setSeries(data.series))
      .catch(console.error);
  }, []);

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-4">Cricket Series</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {series.map((s) => (
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
