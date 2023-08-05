// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchComments = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Implement other API calls for signup, login, adding comments, liking, disliking, etc.
