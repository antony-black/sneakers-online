import axios from "axios";
import Loader from "../components/loader/Loader";

export const FetchService = {
  async getPaginationData(url, options) {
    const data = await axios.get(url, {params: options});
    return data;
  },

  async getAllData(url) {
    const data = await axios.get(url);
    return data;
  },

  extractUrlPart(url) {
    const pageNamePart = url.split("/");
    return pageNamePart[pageNamePart.length - 1];
  },

  createLoadingShadow() {
    return [...Array(12)].map((_, index) => <Loader key={index} />);
  },
};
