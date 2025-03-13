import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import AppRouter from "./routes/Router";


function App() {
  return (
      <Router>
            {/* <Navbar /> */}
            <AppRouter />  
            {/* <Footer /> */}
      </Router>
      
  );
}

export default App;
