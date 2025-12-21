export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6 items-center">
        <h1 className="text-xl font-bold text-green-600">
          MatchPulse
        </h1>

        <a className="text-sm font-medium text-gray-700 hover:text-black">
          Live Scores
        </a>
        <a className="text-sm font-medium text-gray-700 hover:text-black">
          Series
        </a>
        <a className="text-sm font-medium text-gray-700 hover:text-black">
          Teams
        </a>
      </div>
    </nav>
  );
}
