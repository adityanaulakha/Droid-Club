import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import About from "../pages/About";
// import Events from "../pages/Events";
// import Teams from "../pages/Teams";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/events" element={<Events />} /> */}
      {/* <Route path="/teams" element={<Teams />} /> */}
    </Routes>
  );
};

export default AppRouter;
