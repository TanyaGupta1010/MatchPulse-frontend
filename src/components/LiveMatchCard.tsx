export default function LiveMatchCard({ match }: any) {
  return (
    <div className="min-w-[260px] border rounded-md p-3 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        <span className="text-xs font-semibold text-red-600 uppercase">
          Live
        </span>
      </div>

      <p className="text-sm font-semibold leading-snug line-clamp-2">
        {match.name}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        {match.venue}
      </p>

      <p className="text-sm font-medium text-gray-800 mt-2">
        {match.status}
      </p>
    </div>
  );
}
