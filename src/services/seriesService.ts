export interface Series {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  matches: number;
}

export const getSeries = async (): Promise<Series[]> => {
  const res = await fetch("http://localhost:5000/api/series");
  const data = await res.json();
  return data.series;
};
