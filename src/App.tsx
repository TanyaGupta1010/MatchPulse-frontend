import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Teams from "./pages/Teams";
import MatchDetails from "./pages/MatchDetails";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/match/:id" element={<MatchDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
