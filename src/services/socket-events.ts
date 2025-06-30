/**
 * WebSocket Events for gowag-app
 * This file defines all socket events used in the application
 */

// Connection events
export const CONNECTION_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  ERROR: 'error'
};

// General events
export const GENERAL_EVENTS = {
  STATUS_UPDATE: 'status:update',
  ERROR_NOTIFICATION: 'error:notification',
  SYSTEM_NOTIFICATION: 'system:notification'
};

// Namespaces
export const SOCKET_NAMESPACES = {
  NOTIFICATIONS: '/notifications',
  SESSIONS: '/sessions',
  MESSAGES: '/messages',
  SYSTEM: '/system'
};

// Notification events
export const NOTIFICATION_EVENTS = {
  NEW: 'notification:new',
  READ: 'notification:read',
  DELETE: 'notification:delete',
  CLEAR_ALL: 'notification:clear_all'
};

// Session events
export const SESSION_EVENTS = {
  UPDATED: 'session:updated',
  CONNECTED: 'session:connected',
  DISCONNECTED: 'session:disconnected',
  QR_CODE: 'session:qrcode',
  STATE_CHANGE: 'session:state',
  BATTERY_CHANGE: 'session:battery',
  RESTART: 'session:restart',
  LOGOUT: 'session:logout'
};

// Message events
export const MESSAGE_EVENTS = {
  RECEIVED: 'message:received',
  SENT: 'message:sent',
  STATUS_UPDATE: 'message:status',
  DELIVERY_UPDATE: 'message:delivery',
  READ_UPDATE: 'message:read',
  ERROR: 'message:error'
};

// System events
export const SYSTEM_EVENTS = {
  HEALTH_UPDATE: 'system:health',
  USAGE_UPDATE: 'system:usage',
  ALERT: 'system:alert',
  INCIDENT: 'system:incident'
};

// Health events
export const HEALTH_EVENTS = {
  PING: 'health:ping',
  PONG: 'health:pong',
  STATUS: 'health:status',
  DEGRADED: 'health:degraded',
  RESTORED: 'health:restored'
};

// User events
export const USER_EVENTS = {
  PRESENCE_CHANGE: 'user:presence',
  ROLE_CHANGE: 'user:role',
  SETTINGS_CHANGE: 'user:settings'
};

// Event payload types
export interface MessagePayload {
  id: string;
  sessionId: string;
  timestamp: number;
  from?: string;
  to?: string;
  content?: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document';
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  [key: string]: any; // Additional properties
}

export interface SessionPayload {
  id: string;
  name: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  battery?: number;
  qrCode?: string;
  timestamp: number;
  [key: string]: any; // Additional properties
}

export interface NotificationPayload {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  data?: any;
  [key: string]: any; // Additional properties
}

export interface SystemPayload {
  id: string;
  type: string;
  metric?: string;
  value?: number;
  status?: string;
  timestamp: number;
  [key: string]: any; // Additional properties
}

/**
 * Helper function to create a namespaced event name
 * @param namespace Socket namespace
 * @param event Event name
 */
export function createNamespacedEvent(namespace: string, event: string): string {
  const formattedNamespace = namespace.startsWith('/') ? namespace.substring(1) : namespace;
  return `${formattedNamespace}:${event}`;
}

/**
 * Helper function to get all events for a specific namespace
 * @param namespace Socket namespace
 */
export function getNamespaceEvents(namespace: string): Record<string, string> {
  switch (namespace) {
    case SOCKET_NAMESPACES.NOTIFICATIONS:
      return NOTIFICATION_EVENTS;
    case SOCKET_NAMESPACES.SESSIONS:
      return SESSION_EVENTS;
    case SOCKET_NAMESPACES.MESSAGES:
      return MESSAGE_EVENTS;
    case SOCKET_NAMESPACES.SYSTEM:
      return SYSTEM_EVENTS;
    default:
      return {};
  }
} 