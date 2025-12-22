import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Teams from "../pages/Teams";
import TeamDetails from "../pages/TeamDetails";
import MatchDetails from "../pages/MatchDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/match/:id" element={<MatchDetails />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:teamName" element={<TeamDetails />} />
    </Routes>
  );
};

export default AppRoutes;
