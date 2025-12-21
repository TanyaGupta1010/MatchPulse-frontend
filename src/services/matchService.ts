export async function getMatches() {
  const res = await fetch("http://localhost:5000/api/matches");
  return res.json();
}
