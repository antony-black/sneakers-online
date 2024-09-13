import { useState, useEffect } from "react";
import { FetchService } from "../services/FetchService";
import { PaginationService } from "../services/PaginationService";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalPageNumber, setTotalPageNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        const response = await FetchService.getPaginationData(url, options);
        setData(response.data);
        // TODO: separate from useFetch() (I guess, it'd be better to separate the pagination data)
        const pageNumber = await PaginationService.getPageCount(url, options.limit);
        setTotalPageNumber(pageNumber);

        setErrorMsg(null);
      } catch (error) {
        setErrorMsg(error.message || "An error occurred");
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { 
    data, 
    totalPageNumber, 
    pending, 
    errorMsg 
  };
}
