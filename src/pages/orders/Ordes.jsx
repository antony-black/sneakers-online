import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ItemsInfo from "../../components/ItemsInfo/ItemsInfo";
import Card from "../../components/card/Card";
import styles from "./Orders.module.scss";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleGoBackHome = () => {
    navigate("/");
  };
  const {
    data: myOrders,
    pending: myOrdersPending,
    errorMsg: myOrdersErrorMsg,
  } = useFetch("https://66bd909f74dfc195586ce2f4.mockapi.io/orders", {});

  // const parseOrderedItems = (orders) => {
  //   return orders.flatMap((order) =>
  //     order.orderedItems.map((item) => ({
  //       ...item,
  //       orderId: order.id,
  //     }))
  //   );
  // };

  // const parseOrderedItems = (orderedItems) => {
  //   return orderedItems.map((item) => ({
  //     id: item.id,
  //     title: item.title,
  //     price: item.price,
  //     image: item.image,
  //   }));
  // };

  useEffect(() => {
    if (!!myOrders) {
      console.log(myOrders);
      setOrders(myOrders);
    }
  }, [myOrders]);

  return (
    <div className={styles.orders}>
      {orders.length > 0 ? (
        orders.map((order) =>
          order.orderedItems.map((item) => (
            <Card key={item.id} sneakersPair={item} />
          ))
        )
      ) : (
        <ItemsInfo
          className={styles.itemsInfo}
          title={"You have no orders."}
          text={"Make just one order."}
          image={"/source/order_sad_emodzy.svg"}
          onClick={handleGoBackHome}
        />
      )}
    </div>
  );
}
// orders.length > 0 ? (
//   orders.map((order) => (
//     <Card
//       key={order.id}
//       sneakersPair={order.orderedItems.map((item) => item)}
//     />
//   ))

// orders.length > 0 ? (
//   orders.map((order) =>
//     order.orderedItems.map((item) => (
//       <Card key={item.id} sneakersPair={item} />
//     ))
//   )
