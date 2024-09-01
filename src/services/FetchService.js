import axios from "axios";
import Loader from "../components/loader/Loader";

export const FetchService = {
  async getData(url, options) {
    const data = await axios.get(url, { ...options });
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
