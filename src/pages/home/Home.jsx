import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";

export default function Home() {
  const { allSneakers, sneakersLoading } = useGlobalState();
  return (
    <div className="sneakers">
      {sneakersLoading ? (
        <Loader />
      ) : (
        allSneakers.map((item) => <Card key={item.id} item={item} />)
      )}
    </div>
  );
}
