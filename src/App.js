import useGlobalState from "./hooks/useGlobalState";
import { Routes, Route } from "react-router-dom";
import Overlay from "./components/overlay/Overlay";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorite";
import Navbar from "./components/navbar/Navbar";
import "./index.css";

function App() {
  // !!!implement Error and rework pending
  const { searchingInput, cleanSearchInput, handleInputChange } =
    useGlobalState();

  return (
    <div className="App">
      <Overlay />
      <Navbar />
      <div className="content">
        <div className="header-container">
          <h1 className="title">
            {searchingInput !== ""
              ? `Searching request: ${searchingInput}`
              : "All sneakers"}
          </h1>
          <div className="searching-container">
            <img src="../source/icons/search.svg" alt="search" />
            <input
              value={searchingInput}
              onChange={handleInputChange}
              name="serching"
              placeholder="Searching..."
            />
            {searchingInput !== "" && (
              <img
                src="../source/icons/close.svg"
                alt="search"
                onClick={cleanSearchInput}
              />
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
