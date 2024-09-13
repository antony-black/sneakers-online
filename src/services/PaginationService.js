import { FetchService } from "./FetchService";

export const PaginationService = {
  async getPageCount(url, limit) {
    const totalCount = await FetchService.getAllData(url);
    return Math.ceil(totalCount.data.length / limit);
  },

  getPageNumbers(totalPageNumber) {
    const pages = [];
    for(let i = 0; i < totalPageNumber; i++) {
      pages.push(i + 1);
    }
    
    return pages;
  }
}