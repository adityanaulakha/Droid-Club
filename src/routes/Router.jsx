import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Project from "../pages/Projects";
import About from "../pages/About";
// import Events from "../pages/Events";
// import Teams from "../pages/Teams";
import ContactUs from "../pages/ContactUs";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/events" element={<Events />} /> */}
      {/* <Route path="/teams" element={<Teams />} /> */}
      <Route path="/contact-us" element={<ContactUs />} />
    </Routes>
  );
};

export default AppRouter;
