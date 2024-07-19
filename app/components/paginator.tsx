import React from 'react';

export type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => Promise<void>;
};

export default function Paginator(props: PaginatorProps) {
  const { currentPage, totalPages, onPageChange } = props;

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <nav className="flex space-x-2">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <div className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

