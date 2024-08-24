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
};
