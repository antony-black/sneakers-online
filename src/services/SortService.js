export const SortService = {
  isString(sortPoint){
    return typeof sortPoint === "string";
  },

  sortByTitle(a, b, sortPoint){
    return a[sortPoint].localeCompare(b[sortPoint]);
  },

  sortByPrice(a, b, sortPoint){
    return a[sortPoint] - b[sortPoint];
  },

  handleSorting(filteredItems, sortPoint){
    return [...filteredItems].sort((a, b) => {
      return SortService.isString(a[sortPoint]) && SortService.isString(b[sortPoint])
        ? SortService.sortByTitle(a, b, sortPoint)
        : SortService.sortByPrice(a, b, sortPoint);
    });
  },
}