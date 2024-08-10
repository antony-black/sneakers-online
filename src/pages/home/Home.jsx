import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import Searching from "../../components/searching/Searching";
import styles from "./Home.module.scss";

export default function Home() {
  const { originSneakers } = useGlobalState();

  const createLoadingShadow = () => {
    return [...Array(12)].map((_, index) => <Loader key={index} />);
  };
  return (
    <>
      <Searching />
      <div className={styles.sneakers}>
        {originSneakers?.length > 0 &&
          originSneakers.map((sneakers) => (
            <Card key={sneakers.image} sneakers={sneakers} />
          ))}
      </div>
    </>
  );
}
