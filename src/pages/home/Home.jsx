import { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import Searching from "../../components/searching/Searching";
import styles from "./Home.module.scss";

export default function Home() {
  const { pendingSneakers, errorMsgSneakers } = useGlobalState();
  const [filteredSneakers, setFilteredSneakers] = useState([]);

  const createLoadingShadow = () => {
    return [...Array(12)].map((_, index) => <Loader key={index} />);
  };
  return (
    <>
      <Searching setFilteredSneakers={setFilteredSneakers} />
      <div className={styles.allSneakers}>
        {errorMsgSneakers ? (
          <div className="error-msg">{`${errorMsgSneakers}!!!`}</div>
        ) : null}
        {pendingSneakers ? (
          createLoadingShadow()
        ) : filteredSneakers?.length > 0 ? (
          filteredSneakers.map((sneakersPair) => (
            <Card key={sneakersPair.image} sneakersPair={sneakersPair} added />
          ))
        ) : (
          <div className={styles.nothing}>Nothing found.</div>
        )}
      </div>
    </>
  );
}
