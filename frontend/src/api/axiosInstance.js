import axios from 'axios'

export const API = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL
    }
)
API.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;

        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }

)

API.interceptors.response.use(
  (response) => response, // Pass through successful requests
  (error) => {
    // If the server returns a 401 status code
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or token invalid. Clearing credentials...");
      
      // Wipe the local cache cleanly
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Force reload or redirect back to login
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);