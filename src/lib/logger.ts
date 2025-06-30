/**
 * Logger for gowag-app
 * A centralized logging utility with different log levels and environments
 */
import { tokenManager } from '@/api/api';

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

// Log entry interface
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  module?: string;
  data?: any;
  error?: Error;
  user?: string;
  sessionId?: string;
}

// Default log level based on environment
const DEFAULT_LOG_LEVEL = process.env.NODE_ENV === 'production' 
  ? LogLevel.INFO 
  : LogLevel.DEBUG;

// Logger class as a singleton
class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private enableConsole: boolean;
  private enableRemote: boolean;
  private remoteUrl: string | null = null;
  private userId: string | null = null;
  private sessionId: string | null = null;
  
  private constructor() {
    this.logLevel = DEFAULT_LOG_LEVEL;
    this.enableConsole = true;
    this.enableRemote = process.env.NODE_ENV === 'production';
    this.remoteUrl = process.env.NEXT_PUBLIC_LOG_API_URL || null;
  }
  
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  // Set the minimum log level
  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }
  
  // Enable or disable console logging
  public setEnableConsole(enable: boolean): void {
    this.enableConsole = enable;
  }
  
  // Enable or disable remote logging
  public setEnableRemote(enable: boolean): void {
    this.enableRemote = enable;
  }
  
  // Set the remote logging URL
  public setRemoteUrl(url: string | null): void {
    this.remoteUrl = url;
  }

  // Set the user ID for logging
  public setUserId(userId: string | null): void {
    this.userId = userId;
  }

  // Set the session ID for logging
  public setSessionId(sessionId: string | null): void {
    this.sessionId = sessionId;
  }
  
  // Debug level logging
  public debug(message: string, module?: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, module, data);
  }
  
  // Info level logging
  public info(message: string, module?: string, data?: any): void {
    this.log(LogLevel.INFO, message, module, data);
  }
  
  // Warning level logging
  public warn(message: string, module?: string, data?: any): void {
    this.log(LogLevel.WARN, message, module, data);
  }
  
  // Error level logging
  public error(message: string, module?: string, error?: Error, data?: any): void {
    this.log(LogLevel.ERROR, message, module, data, error);
  }
  
  // Fatal level logging
  public fatal(message: string, module?: string, error?: Error, data?: any): void {
    this.log(LogLevel.FATAL, message, module, data, error);
  }
  
  // Main logging method
  private log(level: LogLevel, message: string, module?: string, data?: any, error?: Error): void {
    // Check if we should log at this level
    if (level < this.logLevel) {
      return;
    }
    
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      module,
      data,
      error
    };
    
    // Add user ID if available
    if (this.userId) {
      logEntry.user = this.userId;
    }

    // Add session ID if available
    if (this.sessionId) {
      logEntry.sessionId = this.sessionId;
    }
    
    // Console logging
    if (this.enableConsole) {
      this.logToConsole(logEntry);
    }
    
    // Remote logging
    if (this.enableRemote && this.remoteUrl) {
      this.logToRemote(logEntry);
    }
  }
  
  // Console logging implementation
  private logToConsole(entry: LogEntry): void {
    const { timestamp, level, message, module, data, error } = entry;
    
    // Format: [TIMESTAMP] [LEVEL] [MODULE] MESSAGE
    const moduleText = module ? `[${module}]` : '';
    const formattedMessage = `[${timestamp}] [${LogLevel[level]}] ${moduleText} ${message}`;
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, data || '');
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, data || '');
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, data || '');
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, error || '', data || '');
        break;
      case LogLevel.FATAL:
        console.error(`FATAL: ${formattedMessage}`, error || '', data || '');
        break;
    }
  }
  
  // Remote logging implementation
  private async logToRemote(entry: LogEntry): Promise<void> {
    // Don't log to remote if no URL
    if (!this.remoteUrl) {
      return;
    }
    
    // Don't log debug messages remotely in production
    if (entry.level === LogLevel.DEBUG && process.env.NODE_ENV === 'production') {
      return;
    }
    
    try {
      // Format error for transmission
      if (entry.error) {
        entry.error = {
          name: entry.error.name,
          message: entry.error.message,
          stack: entry.error.stack
        } as any;
      }
      
      // Get authentication token for API call if available
      const token = tokenManager.getAuthToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      // Add authorization if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Send log entry to remote server
      await fetch(this.remoteUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(entry),
        // Don't wait for response if it takes too long
        signal: AbortSignal.timeout(2000)
      });
    } catch (err) {
      // Don't log remote logging errors to avoid infinite loops
      if (this.enableConsole) {
        console.error('[Logger] Failed to send log to remote server:', err);
      }
    }
  }
  
  // Group related logs together (console only)
  public group(name: string): void {
    if (this.enableConsole && console.group) {
      console.group(name);
    }
  }
  
  // End a log group (console only)
  public groupEnd(): void {
    if (this.enableConsole && console.groupEnd) {
      console.groupEnd();
    }
  }
  
  // Log performance timing
  public time(label: string): void {
    if (this.enableConsole && console.time) {
      console.time(label);
    }
  }
  
  // End performance timing and log result
  public timeEnd(label: string): void {
    if (this.enableConsole && console.timeEnd) {
      console.timeEnd(label);
    }
  }
}

// Export singleton instance
const logger = Logger.getInstance();
export default logger; 