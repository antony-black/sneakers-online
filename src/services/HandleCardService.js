import axios from "axios";
import { FetchService } from "./FetchService";

export const HandleCardService = {
  setIsAdded(setItems, itemObject, value) {
    setItems((added) => ({ ...added, [itemObject.image]: value }));
  },

  async addTo(itemObject, url, setItems, setIsAdded) {
    try {
      // setItems((items) => [...items, itemObject]);
      // HandleCardService.setIsAdded(setIsAdded, itemObject, true);
      const { data } = await axios.post(url, itemObject);
      setItems((items) => [...items, data]);
      HandleCardService.setIsAdded(setIsAdded, itemObject, true);
    } catch (err) {
      console.log(
        err.message,
        `The Error caused during adding to the ${FetchService.extractUrlPart(
          url
        )}`
      );
    }
  },

  async removeFrom(itemObject, url, setItems, setIsAdded) {
    try {
      const { data: itemsList } = await axios.get(url);
      const itemToRemove = itemsList.find(
        (item) => item.image === itemObject.image
      );
      setItems((items) => items.filter((item) => item.id !== itemToRemove.id));
      HandleCardService.setIsAdded(setIsAdded, itemObject, false);
      await axios.delete(`${url}/${itemToRemove.id}`);
    } catch (err) {
      console.log(
        err.message,
        `The Error caused during removing from the ${FetchService.extractUrlPart(
          url
        )}`
      );
    }
  },

  manageItem(itemObject, items, url, setItems, setIsAdded) {
    const isCartItemsAdded = !items.some(
      (cartItem) => cartItem.image === itemObject.image
    );

    isCartItemsAdded
      ? HandleCardService.addTo(itemObject, url, setItems, setIsAdded)
      : HandleCardService.removeFrom(itemObject, url, setItems, setIsAdded);
  },

  updateExistingItems(items, setItems) {
    items.forEach((item) => HandleCardService.setIsAdded(setItems, item, true));
  },
};
