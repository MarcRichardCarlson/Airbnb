export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
    
  export const getToken = () => {
    return localStorage.getItem('token');
  };
    
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const saveUserId = (userId) => {
    localStorage.setItem('userId', userId);
  };
  
  export const getUserId = () => {
    return localStorage.getItem('userId');
  };
  
  import axios from 'axios';
  
  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });
  
  // Set the default Authorization header for all Axios requests
  api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` || '';
  
  export default api;