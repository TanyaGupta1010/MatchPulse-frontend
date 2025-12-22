import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import MatchDetails from "./pages/MatchDetails";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamName" element={<TeamDetails />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:id" element={<SeriesDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
