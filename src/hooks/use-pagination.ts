import { useState, useCallback, useMemo } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  totalItems = 0
}: UsePaginationOptions = {}) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [total, setTotal] = useState<number>(totalItems);
  
  // Calculate total number of pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);
  
  // Go to specific page
  const goToPage = useCallback((page: number) => {
    const targetPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(targetPage);
  }, [totalPages]);
  
  // Go to next page
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);
  
  // Go to previous page
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);
  
  // Go to first page
  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);
  
  // Go to last page
  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);
  
  // Change page size
  const changePageSize = useCallback((newSize: number) => {
    setPageSize(newSize);
    // Adjust current page to keep the first item on the current page visible
    const firstItemIndex = (currentPage - 1) * pageSize;
    const newPage = Math.floor(firstItemIndex / newSize) + 1;
    setCurrentPage(newPage);
  }, [currentPage, pageSize]);
  
  // Update total items count
  const setTotalItems = useCallback((count: number) => {
    setTotal(count);
    // Adjust current page if it's now out of bounds
    if (currentPage > Math.ceil(count / pageSize) && count > 0) {
      setCurrentPage(Math.ceil(count / pageSize));
    }
  }, [currentPage, pageSize]);
  
  // Calculate offset for data fetching
  const offset = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);
  
  // Generate array of page numbers for pagination UI
  const pageNumbers = useMemo(() => {
    const maxPageButtons = 5; // Adjust as needed
    const pages: number[] = [];
    
    if (totalPages <= maxPageButtons) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset of pages with ellipsis
      let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      let endPage = startPage + maxPageButtons - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push(-1); // -1 represents ellipsis
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(-1); // -1 represents ellipsis
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);
  
  return {
    currentPage,
    pageSize,
    totalItems: total,
    totalPages,
    offset,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    changePageSize,
    setTotalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
} 