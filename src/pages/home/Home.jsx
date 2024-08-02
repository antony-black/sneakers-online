import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import Searching from "../../components/searching/Searching";
import styles from "./Home.module.scss";

export default function Home() {
  const { allSneakers, sneakersLoading } = useGlobalState();
  return (
    <>
      <Searching />
      <div className={styles.sneakers}>
        {sneakersLoading ? (
          <Loader />
        ) : (
          allSneakers.map((item) => <Card key={item.id} item={item} />)
        )}
      </div>
    </>
  );
}
