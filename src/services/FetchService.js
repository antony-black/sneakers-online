import axios from "axios";

export const FetchService = {
  async getData(url, options) {
    const data = await axios.get(url, { ...options });
    return data;
  },

  extractUrlPart(url) {
    const pageNamePart = url.split("/");
    return pageNamePart[pageNamePart.length - 1];
  },
};
