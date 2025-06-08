import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPosts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      params: {
        page,
        limit,
      },
    });

    return {
      posts: response.data.posts || [],
      totalPages:
        response.data.totalPages || Math.ceil(response.data.total / limit),
      total: response.data.total || 0,
    };
  } catch (error) {
    console.error("API Error:", error);
    return { posts: [], totalPages: 1, total: 0 };
  }
};

export const fetchAndSavePosts = async () => {
  await axios.get(`${API_BASE_URL}/fetch`);
};

export const updatePost = async (id, postData) => {
  await axios.put(`${API_BASE_URL}/posts/${id}`, postData);
};

export const deletePost = async (id) => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`);
};

export const bulkDeletePosts = async (ids) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/bulk`, {
    data: { ids },
  });
  return response.data;
};
