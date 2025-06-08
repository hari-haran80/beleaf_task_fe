import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchPosts,
  fetchAndSavePosts,
  updatePost,
  deletePost,
  bulkDeletePosts,
} from "../../services/api.js";
import PostsTable from "../../components/Modals/PostsTable.js";
import Pagination from "../../components/Pagination/Pagination.js";
import CanvasCursor from "../../components/CustomCursor/CanvasCursor.js";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Now state variable
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchPosts(currentPage, pageSize);

      setPosts(response.posts || []);
      setTotalPages(response.totalPages || 1);
      setTotalDataCount(response.total || 0);
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]); // ✅ Dependencies that `getPosts` relies on

  const togglePostSelection = (postId) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const selectAllPosts = () => {
    setSelectedPosts((prev) =>
      prev.length === posts.length ? [] : posts.map((post) => post._id)
    );
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) {
      toast.warning("No posts selected for deletion");
      return;
    }

    try {
      await bulkDeletePosts(selectedPosts);
      toast.success(`Deleted ${selectedPosts.length} posts`);
      setSelectedPosts([]);
      await getPosts();
    } catch (error) {
      toast.error("Failed to delete selected posts");
      console.error(error);
    }
  };

  const handleFetchAndSave = async () => {
    try {
      setLoading(true);
      await fetchAndSavePosts();
      setCurrentPage(1); // Reset to first page after new fetch
      await getPosts();
      toast.success("Posts fetched and saved successfully!");
    } catch (error) {
      toast.error("Failed to fetch and save posts");
      console.error(error);
    }
  };

  const handleUpdate = async (id, postData) => {
    try {
      await updatePost(id, postData);
      await getPosts();
      setEditPost(null);
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error("Failed to update post");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      // If deleting last item on page, go to previous page
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await getPosts();
      }
      setDeletingPost(null);
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post");
      console.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="min-h-screen bg-gradient-to-br pt-[80px] from-blue-50 to-indigo-100 py-8 px-4">
      <CanvasCursor />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            JSON Placeholder Posts
          </h1>
          <button
            onClick={handleFetchAndSave}
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-white font-medium shadow-lg
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              }
              transition-all duration-300 transform hover:scale-105`}
          >
            {loading ? "Processing..." : "Fetch & Save Posts"}
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Show</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-gray-700">entries</span>
          </div>

          <span className="text-sm text-gray-600">
            Total: {totalDataCount} posts
          </span>
        </div>

        <PostsTable
          posts={posts}
          loading={loading}
          onEdit={setEditPost}
          onDelete={setDeletingPost}
          editPost={editPost}
          setEditPost={setEditPost}
          deletingPost={deletingPost}
          setDeletingPost={setDeletingPost}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          selectedPosts={selectedPosts}
          togglePostSelection={togglePostSelection}
          selectAllPosts={selectAllPosts}
          onBulkDelete={handleBulkDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default HomePage;
