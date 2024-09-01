import { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Searching from "../../components/searching/Searching";
import { FetchService } from "../../services/FetchService";
import styles from "./Home.module.scss";

export default function Home() {
  const { pendingSneakers, errorMsgSneakers } = useGlobalState();
  const [filteredSneakers, setFilteredSneakers] = useState([]);

  return (
    <>
      <Searching setFilteredSneakers={setFilteredSneakers} />
      <div className={styles.allSneakers}>
        {errorMsgSneakers ? (
          <div className="error-msg">{`${errorMsgSneakers}!!!`}</div>
        ) : null}
        {pendingSneakers ? (
          FetchService.createLoadingShadow()
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
