import axios from "axios";
import { FetchService } from "./FetchService";

export const HandleCardService = {
  async addTo(itemObject, url, setToItemsArray, setIsAdded) {
    try {
      const { data } = await axios.post(url, itemObject);
      setToItemsArray((items) => [...items, data]);
      setIsAdded((added) => ({ ...added, [itemObject.image]: true }));
    } catch (err) {
      console.log(
        err.message,
        `The Error caused during adding to the ${FetchService.extractUrlPart(
          url
        )}`
      );
    }
  },

  async removeFrom(itemObject, url, setToItemsArray, setIsAdded) {
    try {
      const { data: itemsList } = await axios.get(url);
      const itemToRemove = itemsList.find(
        (item) => item.image === itemObject.image
      );

      await axios.delete(`${url}/${itemToRemove.id}`);
      setToItemsArray((items) =>
        items.filter((item) => item.id !== itemToRemove.id)
      );
      setIsAdded((added) => ({ ...added, [itemObject.image]: false }));
    } catch (err) {
      console.log(
        err.message,
        `The Error caused during removing from the ${FetchService.extractUrlPart(
          url
        )}`
      );
    }
  },
};
