import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todoappmobile.onrender.com/api', // your backend URL
});

export default api;
