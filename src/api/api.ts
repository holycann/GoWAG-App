import axios from "axios";

// Configure base API client
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token or redirect to login
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          // Implement token refresh logic here
          // const response = await apiClient.post('/auth/refresh', { refreshToken });
          // localStorage.setItem('auth_token', response.data.token);
          // originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          // return axios(originalRequest);
        }

        // Redirect to login if we can't refresh
        window.location.href = "/auth/login";
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
