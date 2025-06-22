import { useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    paginatedData,
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  };
}
