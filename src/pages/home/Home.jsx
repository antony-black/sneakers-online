import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import Searching from "../../components/searching/Searching";
import styles from "./Home.module.scss";

export default function Home() {
  const { originSneakers, pendingSneakers, errorMsgSneakers } =
    useGlobalState();

  const createLoadingShadow = () => {
    return [...Array(12)].map((_, index) => <Loader key={index} />);
  };
  return (
    <>
      <Searching />
      <div className={styles.allSneakers}>
        {pendingSneakers
          ? createLoadingShadow()
          : originSneakers.map((sneakersPair) => (
              <Card key={sneakersPair.image} sneakersPair={sneakersPair} />
            ))}
      </div>
    </>
  );
}
