import { Routes, Route } from "react-router-dom";
import Overlay from "./components/overlay/Overlay";
import Navbar from "./components/navbar/Navbar";
import { privateRoutes } from "./router";
import "./index.css";

function App() {
  // !!!implement Error and rework pending
  return (
    <div className="App">
      <Overlay />
      <Navbar />
      <div className="content">
        <Routes>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              exact={route.exact}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
