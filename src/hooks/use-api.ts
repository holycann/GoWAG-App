import { useState, useCallback } from 'react';
import { useUI } from '@/context/ui-context';
import logger from '@/lib/logger';

interface UseApiOptions {
  showSuccessNotification?: boolean;
  showErrorNotification?: boolean;
  successMessage?: string;
  errorMessage?: string;
  logContext?: string;
}

export function useApi<T = any, E = Error>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { showNotification } = useUI();
  
  const {
    showSuccessNotification = false,
    showErrorNotification = true,
    successMessage = 'Operation completed successfully',
    errorMessage = 'An error occurred',
    logContext = 'api-hook'
  } = options;
  
  const execute = useCallback(async (...args: any[]): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      
      setData(result);
      
      if (showSuccessNotification) {
        showNotification(
          'Success',
          successMessage,
          'success'
        );
      }
      
      logger.info(`API call successful: ${apiFunction.name || 'anonymous function'}`, logContext);
      
      return result;
    } catch (err: any) {
      setError(err as E);
      
      if (showErrorNotification) {
        showNotification(
          'Error',
          err?.message || errorMessage,
          'error'
        );
      }
      
      logger.error(
        `API call failed: ${apiFunction.name || 'anonymous function'}`,
        logContext,
        err
      );
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [
    apiFunction,
    showSuccessNotification,
    showErrorNotification,
    successMessage,
    errorMessage,
    logContext,
    showNotification
  ]);
  
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);
  
  return {
    data,
    error,
    isLoading,
    execute,
    reset
  };
} 