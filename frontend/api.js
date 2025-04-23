import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkUserExists = async (data) => {
  try {
    const response = await api.post('/accounts/check_user_exists/', data);
    return response.data; // { exists: true/false }
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};

// Function to get all tasks
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// ... other API functions