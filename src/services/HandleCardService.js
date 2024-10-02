import axios from "axios";
import { FetchService } from "./FetchService";

export const HandleCardService = {
  isItemPresent(items,itemObject) {
    const isPresent = items.some(
      (cartItem) => cartItem.image === itemObject.image
    );

    return isPresent;
  },

  setIsAdded(setItems, itemObject, value) {
    setItems((added) => ({ ...added, [itemObject.image]: value }));
  },

async getItemToRemove(url, itemObject) {
  try {
    const { data: itemsList } = await FetchService.getAllData(url);
    const itemToRemove = itemsList.find(
      (item) => item.image === itemObject.image
    );
    
    return itemToRemove;
  } catch (error) {
    console.error("Error fetching item to remove:", error.message);
    throw error;
  }
},

  setItemState(setItems, setIsAdded, itemObject, isPresent) { 
    !isPresent
        ? setItems((items) => [...items, itemObject])
        : setItems((items) => items.filter((item) => item.id !== itemObject.id));

    HandleCardService.setIsAdded(setIsAdded, itemObject, !isPresent);
  },

  async addItem(itemObject, url, setItems, setIsAdded, isItemPresent) {
    try {
      const { data } = await axios.post(url, itemObject);
      HandleCardService.setItemState(setItems, setIsAdded, data, isItemPresent); 
    } catch (err) {
      console.log(
        err.message,
        `Error while adding item to ${FetchService.extractUrlPart(url)}`
      );
    }
  },

  async removeItem(itemObject, url, setItems, setIsAdded, isItemPresent) {
    try {
      const itemToRemove = await HandleCardService.getItemToRemove(url, itemObject);
      HandleCardService.setItemState(setItems, setIsAdded, itemToRemove, isItemPresent);
      await axios.delete(`${url}/${itemToRemove.id}`);
    } catch (err) {
      console.log(
        err.message,
        `Error while removing item from ${FetchService.extractUrlPart(url)}`
      );
    }
  },

  manageItem(items, itemObject , url, setItems, setIsAdded) {
    const isPresent = HandleCardService.isItemPresent(items, itemObject);

    isPresent
      ? HandleCardService.removeItem(itemObject, url, setItems, setIsAdded, isPresent)
      : HandleCardService.addItem(itemObject, url, setItems, setIsAdded, isPresent);
  },

  updateExistingItems(items, setItems) {
    items.forEach((item) => HandleCardService.setIsAdded(setItems, item, true));
  },
};
