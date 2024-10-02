import { FetchService } from "./FetchService";

export const PaginationService = {
  async fetchTotalPageNumber(url, limit) {
    try {
      const totalCount = await FetchService.getAllData(url);
      const totalItems = totalCount.data.length;
      const totalPages = PaginationService.checkLimit(totalItems, limit);
      return totalPages;
    } catch (error) {
      console.error("Failed to fetch total page number", error);
    }
  },

  checkLimit(length, limit) {
    if (limit === -1 || length <= limit) {
      return 1;
    }
    return Math.ceil(length / limit);
  },

  getPageNumbers(totalPageNumber) {
    // console.log("getPageNumbers >>>>");
    try {
      const pages = [];

      if (typeof totalPageNumber !== "number" || totalPageNumber < 0) {
        throw new Error(
          "Invalid totalPageNumber. It must be a non-negative number."
        );
      }

      for (let i = 0; i < totalPageNumber; i++) {
        pages.push(i + 1);
      }

      return pages;
    } catch (error) {
      console.error("Error in getPageNumbers:", error.message);
      return [];
    }
  },
};
