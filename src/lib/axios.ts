import axios, { AxiosError, AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // manda/recibe cookies HttpOnly automáticamente
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

function resolveQueue() {
  pendingQueue.forEach((cb) => cb());
  pendingQueue = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/refresh') ||
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/me');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // Ya hay un refresh en curso (ej. 3 requests fallaron a la vez),
        // se pone este en cola en vez de disparar 3 refresh simultáneos.
        return new Promise((resolve) => {
          pendingQueue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post('/auth/refresh');
        isRefreshing = false;
        resolveQueue();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        pendingQueue = [];
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login?session=expired';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
