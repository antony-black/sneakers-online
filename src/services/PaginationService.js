import { FetchService } from "./FetchService";
// TODO: try&catch
export const PaginationService = {
  async getPageTotalNumber(url, limit) {
    const totalCount = await FetchService.getAllData(url);
    return Math.ceil(totalCount.data.length / limit);
  },

  getPageNumbers(totalPageNumber) {
    // console.log("getPageNumbers >>>>");

    const pages = [];
    for (let i = 0; i < totalPageNumber; i++) {
      pages.push(i + 1);
    }

    return pages;
  },
};
