import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import AppRouter from "./routes/Router";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500); // Extra time for smooth fade-out
    }, 2000); // Loader visible for 2 seconds
  }, []);

  return (
    <div className="bg-black min-h-screen transition-colors duration-500">
      <Router>
        {loading ? (
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <Loader />
          </div>
        ) : (
          <div className="animate-fadeIn text-white">
            {/* <Navbar /> */}
            <AppRouter />
            {/* <Footer /> */}
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
