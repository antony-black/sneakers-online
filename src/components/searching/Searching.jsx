import useGlobalState from "../../hooks/useGlobalState";

export default function Searching() {
  const { searchingInput, cleanSearchInput, handleInputChange } =
    useGlobalState();
  return (
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
  );
}
