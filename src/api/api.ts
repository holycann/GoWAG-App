import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import logger from "@/lib/logger";

// Standardized API error response type
export interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: any;
  status?: number;
}

// Token storage singleton (in-memory)
class TokenManager {
  private static instance: TokenManager;
  private authToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public setAuthToken(token: string | null, expiresIn?: number): void {
    this.authToken = token;
    if (token && expiresIn) {
      // Set expiration time (current time + expiresIn in seconds)
      this.tokenExpiresAt = Date.now() + expiresIn * 1000;
    } else {
      this.tokenExpiresAt = null;
    }
  }

  public getAuthToken(): string | null {
    // Check if token is expired
    if (this.tokenExpiresAt && Date.now() > this.tokenExpiresAt) {
      logger.warn("Auth token has expired", "api-client");
      return null;
    }
    return this.authToken;
  }

  public setRefreshToken(token: string | null): void {
    this.refreshToken = token;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public clearTokens(): void {
    this.authToken = null;
    this.refreshToken = null;
    this.tokenExpiresAt = null;
  }

  public isTokenExpired(): boolean {
    return !!this.tokenExpiresAt && Date.now() > this.tokenExpiresAt;
  }
}

const tokenManager = TokenManager.getInstance();

// Configure base API client
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second initial delay
const RETRY_STATUS_CODES = [408, 429, 500, 502, 503, 504];

// Create API client with default config
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add request ID for tracing
    const requestId = generateRequestId();
    config.headers["X-Request-ID"] = requestId;
    
    // Add auth token if available
    const token = tokenManager.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing requests in development
    if (process.env.NODE_ENV === "development") {
      logger.info(
        `API Request: ${config.method?.toUpperCase()} ${config.url}`,
        "api-client"
      );
    }
    
    return config;
  },
  (error) => {
    logger.error("API Request error", "api-client", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === "development") {
      logger.info(
        `API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
        "api-client"
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { 
      _retry?: boolean;
      _retryCount?: number;
    };
    
    // Log the error with more details
    const status = error.response?.status;
    const method = originalRequest?.method?.toUpperCase();
    const url = originalRequest?.url;
    
    logger.error(
      `API Error: ${status} ${method} ${url}`,
      "api-client",
      error
    );

    // Check if we should retry the request
    if (
      originalRequest &&
      (!originalRequest._retryCount || originalRequest._retryCount < MAX_RETRIES) &&
      RETRY_STATUS_CODES.includes(error.response?.status || 0)
    ) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      // Calculate exponential backoff delay
      const delay = RETRY_DELAY * Math.pow(2, originalRequest._retryCount - 1);
      
      logger.info(
        `Retrying request (${originalRequest._retryCount}/${MAX_RETRIES}) after ${delay}ms: ${originalRequest.method?.toUpperCase()} ${originalRequest.url}`,
        "api-client"
      );
      
      // Wait for the delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry the request
      return apiClient(originalRequest);
    }

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = tokenManager.getRefreshToken();
        if (refreshToken) {
          logger.info("Attempting to refresh auth token", "api-client");
          
          try {
            // Call the refresh token endpoint
            const response = await axios.post(
              `${baseURL}/auth/refresh`,
              { refreshToken },
              { headers: { "Content-Type": "application/json" } }
            );
            
            // Update tokens
            const { token, expiresIn } = response.data;
            tokenManager.setAuthToken(token, expiresIn);
            
            // Update authorization header and retry the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            
            logger.info("Token refreshed successfully", "api-client");
            return axios(originalRequest);
          } catch (refreshError) {
            logger.error("Failed to refresh token", "api-client", refreshError as Error);
            tokenManager.clearTokens();
            redirectToLogin();
            return Promise.reject(standardizeError(refreshError));
          }
        } else {
          // No refresh token available
          logger.warn("No refresh token available for auth refresh", "api-client");
          tokenManager.clearTokens();
          redirectToLogin();
        }
      } catch (refreshError) {
        logger.error("Error during token refresh flow", "api-client", refreshError as Error);
        tokenManager.clearTokens();
        redirectToLogin();
      }
    }
    
    // Handle other common error cases
    if (error.response?.status === 403) {
      logger.warn("Access forbidden", "api-client", {
        message: "Access forbidden",
        url: originalRequest?.url,
        responseData: error.response?.data
      });
      // Could dispatch an event or show a notification
    }
    
    if (error.response?.status === 404) {
      logger.warn(`Resource not found: ${originalRequest?.url}`, "api-client");
    }
    
    if (error.response?.status === 500) {
      logger.error("Server error", "api-client", error);
      // Could show a user-friendly error message
    }

    // Standardize error response format before rejecting
    return Promise.reject(standardizeError(error));
  }
);

// Helper function to standardize error responses
function standardizeError(error: any): ApiErrorResponse {
  // If it's an Axios error with a response
  if (error.response && error.response.data) {
    // If the backend already returns a standardized error format
    if (error.response.data.error) {
      return {
        ...error.response.data,
        status: error.response.status
      };
    }
    
    // Otherwise, create a standardized format
    return {
      error: error.response.data.message || error.message || "An unknown error occurred",
      code: error.response.data.code || `ERR_${error.response.status}`,
      details: error.response.data,
      status: error.response.status
    };
  }
  
  // For network errors or other non-response errors
  return {
    error: error.message || "Network error",
    code: error.code || "ERR_NETWORK",
    details: error.stack ? { stack: error.stack } : undefined
  };
}

// Helper function to generate a unique request ID
function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

// Helper function to redirect to login
function redirectToLogin(): void {
  if (typeof window !== "undefined") {
    // Store the current URL to redirect back after login
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath !== "/auth/login") {
      sessionStorage.setItem("redirectAfterLogin", currentPath);
    }
    
    window.location.href = "/auth/login";
  }
}

// Enhanced API client with utility methods
const api = {
  client: apiClient,
  
  // GET request with error handling
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw standardizeError(error);
    }
  },
  
  // POST request with error handling
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw standardizeError(error);
    }
  },
  
  // PUT request with error handling
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw standardizeError(error);
    }
  },
  
  // PATCH request with error handling
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw standardizeError(error);
    }
  },
  
  // DELETE request with error handling
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw standardizeError(error);
    }
  }
};

export { apiClient, tokenManager, api };
