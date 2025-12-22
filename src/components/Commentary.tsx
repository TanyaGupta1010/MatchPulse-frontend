const Commentary = ({ match }: { match: any }) => {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-2 text-sm">
      <p>🟢 Match started at {match.venue}</p>
      <p>🔔 {match.status}</p>
      <p>📅 Played on {match.date}</p>
      <p>🏏 Teams: {match.teams.join(" vs ")}</p>
    </div>
  );
};

export default Commentary;
