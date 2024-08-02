import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";

export default function Favorites() {
  const { favorites } = useGlobalState();
  return (
    <div>
      {favorites?.length > 0 ? (
        favorites.map((favItem) => <Card key={favItem.id} item={favItem} />)
      ) : (
        <p>{`Nothing added yet:)`}</p>
      )}
    </div>
  );
}
