import Card from "./components/card/Card";
import Header from "./components/header/Header";
import Overlay from "./components/overlay/Overlay";

function App() {
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
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
