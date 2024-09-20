import { FetchService } from "./FetchService";
// TODO: try&catch
export const PaginationService = {
  getPageNumbers(totalPageNumber) {
    // console.log("getPageNumbers >>>>");
    const pages = [];
    for (let i = 0; i < totalPageNumber; i++) {
      pages.push(i + 1);
    }

    return pages;
  },
};
