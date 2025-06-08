import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-1 mt-6">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-600 transition"
      >
        First
      </button>
      
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-600 transition"
      >
        Prev
      </button>
      
      {pageNumbers[0] > 1 && (
        <span className="px-3 py-1 text-gray-500">...</span>
      )}
      
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          } transition`}
        >
          {page}
        </button>
      ))}
      
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <span className="px-3 py-1 text-gray-500">...</span>
      )}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-600 transition"
      >
        Next
      </button>
      
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-600 transition"
      >
        Last
      </button>
      
      <span className="ml-4 text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;