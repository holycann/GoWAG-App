import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { tokenManager } from '@/api/api';

// Retry configuration
interface RetryConfig {
  retries: number;
  retryDelay: number;
  retryStatusCodes: number[];
}

// Default retry configuration
const defaultRetryConfig: RetryConfig = {
  retries: 3,
  retryDelay: 1000, // 1 second
  retryStatusCodes: [408, 429, 500, 502, 503, 504]
};

// HTTP Client as a Singleton
class HttpClient {
  private static instance: HttpClient;
  private client: AxiosInstance;
  private retryConfig: RetryConfig;
  
  private constructor(config: AxiosRequestConfig = {}, retryConfig: Partial<RetryConfig> = {}) {
    // Set up axios client with default config
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
      timeout: 15000, // 15 seconds
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      ...config
    });
    
    // Set retry configuration
    this.retryConfig = {
      ...defaultRetryConfig,
      ...retryConfig
    };
    
    // Set up request interceptor
    this.setupRequestInterceptor();
    
    // Set up response interceptor
    this.setupResponseInterceptor();
  }
  
  public static getInstance(config: AxiosRequestConfig = {}, retryConfig: Partial<RetryConfig> = {}): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config, retryConfig);
    }
    return HttpClient.instance;
  }
  
  private setupRequestInterceptor(): void {
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = tokenManager.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  
  private setupResponseInterceptor(): void {
    let isRefreshing = false;
    let failedQueue: any[] = [];
    
    const processQueue = (error: AxiosError | null, token: string | null = null) => {
      failedQueue.forEach(promise => {
        if (error) {
          promise.reject(error);
        } else {
          promise.resolve(token);
        }
      });
      
      failedQueue = [];
    };
    
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest: any = error.config;
        
        // Check if we should retry the request
        if (this.shouldRetry(error) && (!originalRequest._retry || originalRequest._retry < this.retryConfig.retries)) {
          originalRequest._retry = originalRequest._retry ? originalRequest._retry + 1 : 1;
          
          // Wait before retrying
          await this.sleep(this.retryConfig.retryDelay * originalRequest._retry);
          
          // Retry the request
          return this.client(originalRequest);
        }
        
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry401) {
          // If already refreshing, add request to queue
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.client(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }
          
          originalRequest._retry401 = true;
          isRefreshing = true;
          
          // Try to refresh token
          const refreshToken = tokenManager.getRefreshToken();
          
          if (refreshToken) {
            try {
              // Make a request to refresh the token
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'}/auth/refresh`,
                { refreshToken },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
              
              // Update tokens
              const { token, refreshToken: newRefreshToken } = response.data;
              tokenManager.setAuthToken(token);
              tokenManager.setRefreshToken(newRefreshToken);
              
              // Process queue with new token
              processQueue(null, token);
              isRefreshing = false;
              
              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest);
            } catch (refreshError) {
              // Process queue with error
              processQueue(refreshError as AxiosError);
              isRefreshing = false;
              
              // Clear tokens
              tokenManager.clearTokens();
              
              // Redirect to login if in browser environment
              if (typeof window !== 'undefined') {
                window.location.href = '/auth/login';
              }
              
              return Promise.reject(refreshError);
            }
          } else {
            // No refresh token, redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
            
            processQueue(error);
            isRefreshing = false;
          }
        }
        
        // Enhance error with additional info
        if (error.response) {
          const enhancedError: any = new Error(
            error.response.data?.message || error.response.statusText || 'API Error'
          );
          enhancedError.status = error.response.status;
          enhancedError.data = error.response.data;
          enhancedError.headers = error.response.headers;
          enhancedError.originalError = error;
          
          return Promise.reject(enhancedError);
        }
        
        return Promise.reject(error);
      }
    );
  }
  
  private shouldRetry(error: AxiosError): boolean {
    // Don't retry if request was cancelled
    if (axios.isCancel(error)) {
      return false;
    }
    
    // Check if status code is in retryStatusCodes
    const statusCode = error.response?.status;
    if (statusCode && this.retryConfig.retryStatusCodes.includes(statusCode)) {
      return true;
    }
    
    // Retry network errors (ECONNRESET, ETIMEDOUT, etc.)
    return error.code !== 'ECONNABORTED' && (!error.response || error.response.status === 0);
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  private generateRequestId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  // Public methods to make HTTP requests
  public get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.client.get<T>(url, config).then(response => response.data);
  }
  
  public post<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.client.post<T>(url, data, config).then(response => response.data);
  }
  
  public put<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.client.put<T>(url, data, config).then(response => response.data);
  }
  
  public patch<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.client.patch<T>(url, data, config).then(response => response.data);
  }
  
  public delete<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.client.delete<T>(url, config).then(response => response.data);
  }
  
  // Method to access the axios instance directly
  public getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

// Export singleton instance
const httpClient = HttpClient.getInstance();
export default httpClient; 