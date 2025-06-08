import React from 'react';

const BulkDeleteConfirmation = ({ count, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Confirm Bulk Delete
          </h3>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete {count} selected posts? This action cannot be undone.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md hover:from-red-600 hover:to-orange-600 transition"
            >
              Delete {count} Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkDeleteConfirmation;