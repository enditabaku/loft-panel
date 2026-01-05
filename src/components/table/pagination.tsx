
export const paginationRange = ({meta, table}: any) => {
  const pages = [];
  const totalPages = meta?.last_page;
  const currentPage = table.getState().pagination.pageIndex;

  if (totalPages <= 5) {
    // Show all if 5 or fewer
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(0);      // First
    pages.push(1);      // Second

    if (currentPage > 2 && currentPage < totalPages - 3) {
      pages.push("dots-start");
      pages.push(currentPage);
      pages.push("dots-end");
    } else {
      pages.push("dots-middle");
    }

    pages.push(totalPages - 2);  // Second last
    pages.push(totalPages - 1);  // Last
  }

  return pages;
};

