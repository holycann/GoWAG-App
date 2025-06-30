import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Network utility functions
 */

/**
 * Check if the browser is online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Format latency value with appropriate units
 * @param latency Latency in milliseconds
 */
export function formatLatency(latency: number | null): string {
  if (latency === null) return 'Unknown';
  if (latency < 1) return '<1ms';
  if (latency < 1000) return `${Math.round(latency)}ms`;
  return `${(latency / 1000).toFixed(1)}s`;
}

/**
 * Calculate exponential backoff delay
 * @param attempt Current attempt number (0-based)
 * @param baseDelay Base delay in milliseconds
 * @param maxDelay Maximum delay in milliseconds
 */
export function calculateBackoff(
  attempt: number, 
  baseDelay: number = 1000, 
  maxDelay: number = 30000
): number {
  return Math.min(
    baseDelay * Math.pow(1.5, attempt),
    maxDelay
  );
}

/**
 * Check if a status code is a transient error that can be retried
 * @param statusCode HTTP status code
 */
export function isRetryableStatusCode(statusCode: number): boolean {
  // Network errors, timeouts, and server errors
  return [408, 429, 500, 502, 503, 504].includes(statusCode);
}
