import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  fetchPosts, 
  fetchAndSavePosts, 
  updatePost, 
  deletePost 
} from '../../services/api.js';
import PostsTable from '../../components/Modals/PostsTable.js';
import Pagination from '../../components/Pagination/Pagination.js';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10); // Can be made dynamic

const getPosts = async () => {
  try {
    setLoading(true);
    const response = await fetchPosts(currentPage, pageSize);
    
    // Handle different response structures
    let postsData = [];
    let pagesTotal = 1;

    if (Array.isArray(response)) {
      // If response is direct array
      postsData = response;
      pagesTotal = 1;
    } else if (response.posts) {
      // If response has { posts, totalPages }
      postsData = response.posts;
      pagesTotal = response.totalPages || 1;
    } else if (response.data) {
      // If response has { data: { posts, totalPages } }
      postsData = response.data.posts || [];
      pagesTotal = response.data.totalPages || 1;
    }

    setPosts(postsData);
    setTotalPages(pagesTotal);
  } catch (error) {
    toast.error('Failed to fetch posts');
    console.error('Fetch error:', error);
  } finally {
    setLoading(false);
  }
};

  const handleFetchAndSave = async () => {
    try {
      setLoading(true);
      await fetchAndSavePosts();
      setCurrentPage(1); // Reset to first page after new fetch
      await getPosts();
      toast.success('Posts fetched and saved successfully!');
    } catch (error) {
      toast.error('Failed to fetch and save posts');
      console.error(error);
    }
  };

  const handleUpdate = async (id, postData) => {
    try {
      await updatePost(id, postData);
      await getPosts();
      setEditPost(null);
      toast.success('Post updated successfully!');
    } catch (error) {
      toast.error('Failed to update post');
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
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            JSON Placeholder Posts
          </h1>
          <button
            onClick={handleFetchAndSave}
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-white font-medium shadow-lg
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'}
              transition-all duration-300 transform hover:scale-105`}
          >
            {loading ? 'Processing...' : 'Fetch & Save Posts'}
          </button>
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