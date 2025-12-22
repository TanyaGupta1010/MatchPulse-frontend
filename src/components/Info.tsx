const Info = ({ match }: { match: any }) => {
  return (
    <div className="bg-white border rounded-lg p-4 text-sm space-y-2">
      <p>
        <span className="text-gray-500">Match:</span> {match.name}
      </p>
      <p>
        <span className="text-gray-500">Format:</span>{" "}
        {match.matchType.toUpperCase()}
      </p>
      <p>
        <span className="text-gray-500">Venue:</span> {match.venue}
      </p>
      <p>
        <span className="text-gray-500">Date:</span> {match.date}
      </p>
    </div>
  );
};

export default Info;
