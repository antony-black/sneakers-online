export const PaginationService = {
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
