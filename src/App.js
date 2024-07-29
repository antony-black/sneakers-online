import useGlobalState from "./hooks/useGlobalState";
import Card from "./components/card/Card";
import Overlay from "./components/overlay/Overlay";
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import "./index.css";

// const goods = [
//   {
//     id: 1,
//     title: "Male sneakers, Nike Blazer Mid Suede",
//     price: 270,
//     image: "source/sneakers/item-1.jpg",
//   },
//   {
//     id: 2,
//     title: "Male sneakers, Nike Air Max 270",
//     price: 370,
//     image: "source/sneakers/item-2.jpg",
//   },
//   {
//     id: 3,
//     title: "Male sneakers, Nike Blazer Mid Suede",
//     price: 470,
//     image: "source/sneakers/item-3.jpg",
//   },
//   {
//     id: 4,
//     title: "Male sneakers, Aka Boku Future Rider",
//     price: 570,
//     image: "source/sneakers/item-4.jpg",
//   },
//   {
//     id: 5,
//     title: "Male sneakers, Under Armour Curry 8",
//     price: 670,
//     image: "source/sneakers/item-5.jpg",
//   },
//   {
//     id: 6,
//     title: "Male sneakers, Nike Kyrie 7",
//     price: 770,
//     image: "source/sneakers/item-6.jpg",
//   },
//   {
//     id: 7,
//     title: "Male sneakers, Jordan Air Jordan 11",
//     price: 870,
//     image: "source/sneakers/item-7.jpg",
//   },
//   {
//     id: 8,
//     title: "Male sneakers, Nike LeBron XVIII",
//     price: 970,
//     image: "source/sneakers/item-8.jpg",
//   },
//   {
//     id: 9,
//     title: "Male sneakers, Nike Lebron XVIII Low",
//     price: 1070,
//     image: "source/sneakers/item-9.jpg",
//   },
//   {
//     id: 10,
//     title: "Male sneakers, Nike Blazer Mid Suede",
//     price: 1170,
//     image: "source/sneakers/item-10.jpg",
//   },
//   {
//     id: 11,
//     title: "Male sneakers, Aka Boku Future Rider",
//     price: 1270,
//     image: "source/sneakers/item-11.jpg",
//   },
//   {
//     id: 12,
//     title: "Male sneakers, Nike Kyrie Flytrap IV",
//     price: 1370,
//     image: "source/sneakers/item-12.jpg",
//   },
// ];

function App() {
  // !!!implement Error and rework pending
  const {
    sneakers,
    pending,
    searchingInput,
    cleanSearchInput,
    handleInputChange,
  } = useGlobalState();

  return (
    <div className="App">
      <Overlay />
      <Header />
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
        <div className="sneakers">
          {pending ? (
            <Loader />
          ) : (
            sneakers.map((item) => <Card key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
