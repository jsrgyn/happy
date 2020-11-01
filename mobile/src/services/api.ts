import axios from 'axios';

// exp://10.0.0.136:19000

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'http://10.0.0.136:3333',
});

export default api;