import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface UsePaginationProps {
  data: Movie[];
  itemsPerPage: number;
}

const usePagination = ({ data, itemsPerPage }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = data ? Math.ceil(data.length / itemsPerPage) : 1;

  function currentData() {
    if (!data) return [];
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
