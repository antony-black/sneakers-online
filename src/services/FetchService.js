import axios from "axios";
import Loader from "../components/loader/Loader";

export const FetchService = {
  async getPaginatedData(url, options) {
    const data = await axios.get(url, {params: options});
    return data;
  },
// TODO: try&catch
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
