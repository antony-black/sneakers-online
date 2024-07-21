import { useEffect } from "react";
import useGlobalState from "./hooks/useGlobalState";
import Card from "./components/card/Card";
import Header from "./components/header/Header";
import Overlay from "./components/overlay/Overlay";

function App() {
  // !!!implement Error and rework pending
  const { sneakers, pending, error } = useGlobalState();

  return (
    <div className="App">
      <Overlay />
      <Header />
      <div className="content">
        <div className="header-container">
          <h1 className="title">All sneakers</h1>
          <div className="searching-container">
            <img src="../source/icons/search.svg" alt="search" />
            <input name="serching" placeholder="Searching..." />
          </div>
        </div>
        <div className="sneakers">
          {sneakers.map(
            (item) =>
              !pending && (
                <Card
                  key={item.image}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
