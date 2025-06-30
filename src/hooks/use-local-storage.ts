import { useState, useEffect, useCallback } from 'react';
import logger from '@/lib/logger';

// Note: According to the project rules, we should avoid storing tokens in localStorage.
// This hook should only be used for non-sensitive data like UI preferences.

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      logger.error(`Error reading localStorage key "${key}":`, 'use-local-storage', error as Error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      logger.error(`Error setting localStorage key "${key}":`, 'use-local-storage', error as Error);
    }
  }, [key, storedValue]);
  
  // Listen for changes to this localStorage key from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    function handleStorageChange(e: StorageEvent) {
      if (e.key === key && e.newValue) {
        try {
          // When local storage changes, update the state
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          logger.error(
            `Error parsing localStorage change for key "${key}":`, 
            'use-local-storage', 
            error as Error
          );
        }
      }
    }
    
    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);
  
  // Function to remove the item from localStorage
  const removeItem = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      logger.error(`Error removing localStorage key "${key}":`, 'use-local-storage', error as Error);
    }
  }, [key, initialValue]);
  
  return [storedValue, setValue, removeItem] as const;
} 