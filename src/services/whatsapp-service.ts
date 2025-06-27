import apiClient from '../api/api';

export interface WhatsAppSession {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'connecting';
  qrCode?: string;
  lastActivity?: string;
}

export interface Message {
  id: string;
  sessionId: string;
  to: string;
  type: 'text' | 'image' | 'video' | 'document' | 'audio';
  content: string;
  mediaUrl?: string;
  caption?: string;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  createdAt: string;
}

export interface MessageFilter {
  sessionId?: string;
  status?: string;
  type?: string;
  from?: string;
  to?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

const WhatsAppService = {
  // Get all WhatsApp sessions
  async getSessions(): Promise<WhatsAppSession[]> {
    const response = await apiClient.get('/whatsapp/sessions');
    return response.data;
  },
  
  // Get session by ID
  async getSession(sessionId: string): Promise<WhatsAppSession> {
    const response = await apiClient.get(`/whatsapp/sessions/${sessionId}`);
    return response.data;
  },
  
  // Create new session
  async createSession(name: string): Promise<WhatsAppSession> {
    const response = await apiClient.post('/whatsapp/sessions', { name });
    return response.data;
  },
  
  // Delete session
  async deleteSession(sessionId: string): Promise<void> {
    await apiClient.delete(`/whatsapp/sessions/${sessionId}`);
  },
  
  // Get QR code for session
  async getSessionQR(sessionId: string): Promise<string> {
    const response = await apiClient.get(`/whatsapp/sessions/${sessionId}/qr`);
    return response.data.qrCode;
  },
  
  // Check session status
  async checkSessionStatus(sessionId: string): Promise<{ status: string }> {
    const response = await apiClient.get(`/whatsapp/sessions/${sessionId}/status`);
    return response.data;
  },
  
  // Logout session
  async logoutSession(sessionId: string): Promise<void> {
    await apiClient.post(`/whatsapp/sessions/${sessionId}/logout`);
  },
  
  // Send message
  async sendMessage(sessionId: string, to: string, message: string): Promise<Message> {
    const response = await apiClient.post(`/whatsapp/sessions/${sessionId}/send`, {
      to,
      type: 'text',
      content: message
    });
    return response.data;
  },
  
  // Send media message
  async sendMediaMessage(
    sessionId: string, 
    to: string, 
    type: 'image' | 'video' | 'document' | 'audio', 
    mediaUrl: string, 
    caption?: string
  ): Promise<Message> {
    const response = await apiClient.post(`/whatsapp/sessions/${sessionId}/send-media`, {
      to,
      type,
      mediaUrl,
      caption
    });
    return response.data;
  },
  
  // Get message history
  async getMessageHistory(filter: MessageFilter = {}): Promise<{ messages: Message[], total: number }> {
    const response = await apiClient.get('/whatsapp/messages', { params: filter });
    return response.data;
  },
  
  // Get message by ID
  async getMessage(messageId: string): Promise<Message> {
    const response = await apiClient.get(`/whatsapp/messages/${messageId}`);
    return response.data;
  },
  
  // Set up WebSocket connection for real-time updates
  setupWebSocket(sessionId: string, callbacks: {
    onMessage?: (message: any) => void;
    onStatusChange?: (status: any) => void;
    onError?: (error: any) => void;
  }) {
    const token = localStorage.getItem('auth_token');
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'}/ws/whatsapp/${sessionId}?token=${token}`;
    
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log(`WebSocket connected for session ${sessionId}`);
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'message':
            callbacks.onMessage && callbacks.onMessage(data.payload);
            break;
          case 'status':
            callbacks.onStatusChange && callbacks.onStatusChange(data.payload);
            break;
          default:
            console.log('Unknown WebSocket message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
        callbacks.onError && callbacks.onError(error);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      callbacks.onError && callbacks.onError(error);
    };
    
    socket.onclose = () => {
      console.log(`WebSocket disconnected for session ${sessionId}`);
    };
    
    return {
      socket,
      close: () => socket.close()
    };
  }
};

export default WhatsAppService; 