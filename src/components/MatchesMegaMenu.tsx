type Match = {
  id: string;
  name: string;
};

const sections = [
  { title: "International", filter: (m: Match) => m.name.includes("vs") },
  { title: "League", filter: (m: Match) => m.name.includes("League") },
  { title: "Domestic", filter: () => true },
  { title: "Women", filter: (m: Match) => m.name.includes("Women") },
];

const MatchesMegaMenu = ({ matches }: { matches: Match[] }) => {
  return (
    <div className="bg-[#3b3b3b] text-white border-t border-gray-600 shadow-xl">
      {/* TOP FILTERS */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4">
        {["All", "Live Now", "Today"].map((tab) => (
          <span
            key={tab}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
              tab === "All"
                ? "bg-white text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* MATCH COLUMNS */}
      <div className="max-w-7xl mx-auto px-6 pb-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        {sections.map((sec) => (
          <div key={sec.title}>
            <h3 className="text-green-400 font-semibold mb-3 uppercase">
              {sec.title}
            </h3>

            <ul className="space-y-2">
              {matches
                .filter(sec.filter)
                .slice(0, 5)
                .map((match) => (
                  <li
                    key={match.id}
                    className="hover:underline cursor-pointer"
                  >
                    {match.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesMegaMenu;