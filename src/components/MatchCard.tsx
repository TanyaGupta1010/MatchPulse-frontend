export default function MatchCard({ match }: any) {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-sm mb-1">
        {match?.name || "Match"}
      </h3>

      <p className="text-xs text-gray-500 mb-1">
        {match?.venue || "Venue"}
      </p>

      <p className="text-sm font-medium text-red-600 mb-1">
        {match?.status || "Status"}
      </p>

      <p className="text-xs text-gray-400">
        {match?.date || ""}
      </p>
    </div>
  );
}
