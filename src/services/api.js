import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPosts = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_BASE_URL}/posts?page=${page}&limit=${limit}`);
  return response.data;
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