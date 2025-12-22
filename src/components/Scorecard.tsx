const Scorecard = ({ match }: { match: any }) => {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="font-semibold mb-2">Match Status</h2>
      <p className="text-red-600 font-medium">{match.status}</p>

      <p className="mt-3 text-sm">
        {match.teams[0]} vs {match.teams[1]}
      </p>
    </div>
  );
};

export default Scorecard;
