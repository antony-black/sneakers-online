import axios from "axios";
import Loader from "../components/loader/Loader";

export const FetchService = {
  async getPaginatedData(url, options) {
   try {
    const data = await axios.get(url, { params: options });
    return data;
   } catch(error) {
    console.error("Error in getPaginatedData:", error.message);
   }
  },

  async getAllData(url) {
    try {
      // console.log("Fetching data from URL:", url);
      const data = await axios.get(url);
      return data;
    } catch (error) {
      console.error("Error in getAllData:", error);
      throw error;
    }
  },

  async fetchTotalPageNumber(url, limit) {
    try {
      const totalCount = await FetchService.getAllData(url);
      return Math.ceil(totalCount.data.length / limit);
    } catch (error) {
      console.error("Failed to fetch total page number", error);
    }
  },

  extractUrlPart(url) {
    const pageNamePart = url.split("/");
    return pageNamePart[pageNamePart.length - 1];
  },

  createLoadingShadow() {
    return [...Array(12)].map((_, index) => <Loader key={index} />);
  },
};
