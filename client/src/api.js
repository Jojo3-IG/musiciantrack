import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
});

// Before every request, add the login token if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post('/auth/local/register', data);
export const login = (data) => api.post('/auth/local', data);
export const getSessions = () => api.get('/practice-sessions?sort=date:desc');
export const addSession = (data) => api.post('/practice-sessions', { data });
export const deleteSession = (id) => api.delete(`/practice-sessions/${id}`);