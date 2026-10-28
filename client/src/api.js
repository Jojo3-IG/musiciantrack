const base = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: base.endsWith('/api') ? base : `${base.replace(/\/$/, '')}/api`,
});

// Before every request, add the login token if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  const isAuthRoute = config.url.startsWith('/auth/');
  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post('/auth/local/register', data);
export const login = (data) => api.post('/auth/local', data);
export const getSessions = () => api.get('/practice-sessions?sort=date:desc');
export const addSession = (data) => api.post('/practice-sessions', { data });
export const deleteSession = (id) => api.delete(`/practice-sessions/${id}`);



// The real one, with filters
export const getAssignment = (instrument) =>
  api.get('/assignments', {
    params: {
      'filters[instrument][$eq]': instrument,
      'filters[week_start][$lte]': new Date().toLocaleDateString('en-CA'),
      sort: 'week_start:desc',
      'pagination[limit]': 1,
    },
  });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.startsWith('/auth/');
    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);