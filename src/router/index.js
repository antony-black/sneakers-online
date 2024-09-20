import Home from "../pages/home/Home";
import Favorites from "../pages/favorites/Favorites";
import Orders from "../pages/orders/Ordes";

export const privateRoutes = [
  { path: "/", component: Home, exact: true },
  { path: "/favorites", component: Favorites, exact: true },
  { path: "/orders", component: Orders, exact: true },
];
