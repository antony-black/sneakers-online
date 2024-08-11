import { Routes, Route } from "react-router-dom";
import Overlay from "./components/overlay/Overlay";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorites";
import Navbar from "./components/navbar/Navbar";
import "./index.css";

function App() {
  // !!!implement Error and rework pending
  return (
    <div className="App">
      <Overlay />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
