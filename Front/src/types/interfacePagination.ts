export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
    setCurrentPage: (page: number) => void;
  }