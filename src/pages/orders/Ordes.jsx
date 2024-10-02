import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ItemsInfo from "../../components/ItemsInfo/ItemsInfo";
import Card from "../../components/card/Card";
import { FetchService } from "../../services/FetchService";
import { Utils } from "../../utils/Utils";
import { API_URLS } from "../../config/config";
import styles from "./Orders.module.scss";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  const {
    data: myOrders,
    pending: myOrdersPending,
    errorMsg: myOrdersErrorMsg,
  } = useFetch( API_URLS.orders, {});

  //*TODO: CHECK/TEST
  // const parseOrderedItems = (orders) => {
  //   return orders.flatMap((order) =>
  //     order.orderedItems.map((item) => ({
  //       ...item,
  //       orderId: order.id,
  //     }))
  //   );
  // };

  useEffect(() => {
    if (myOrders) {
      setOrders(myOrders);
    }
  }, [myOrders]);

  return (
    <div className={styles.ordersContainer}>
      {myOrdersErrorMsg ? (
        <div className="error-msg">{`${myOrdersErrorMsg}!!!`}</div>
      ) : null}

      {orders.length > 0 && (
            <div className={styles.turnBackContainer}>
              <NavLink to={"/"}>
                <button className={styles.turnBack}>
                  <img src="source/icons/arrow-back-page.svg" alt="turn-back" />
                </button>
              </NavLink>
              <h2 className={styles.turnBackTitle}>Your orders</h2>
            </div>
          )}
          
      <div className={styles.orders}>
        {myOrdersPending ? (
          FetchService.createLoadingShadow()
        ) : orders.length > 0 ? (
          orders.map((order) =>
            order.orderedItems.map((item) => (
              <Card key={item.id} sneakersPair={item} showControl={false} />
            ))
          )
        ) : (
          <ItemsInfo
            className={styles.itemsInfo}
            title={"You have no orders."}
            text={"Make just one order."}
            image={"source/order_sad_emodzy.svg"}
            onClick={() => Utils.handleBackHome(navigate)}
          />
        )}
      </div>
    </div>
  );
}
