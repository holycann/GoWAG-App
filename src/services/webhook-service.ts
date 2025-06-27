import apiClient from '../api/api';

export interface Webhook {
  id: string;
  sessionId: string;
  name: string;
  url: string;
  events: string[];
  secret?: string;
  headers?: Record<string, string>;
  isActive: boolean;
}

export interface WebhookLog {
  id: string;
  webhookId: string;
  event: string;
  payload: any;
  response: {
    status: number;
    body?: string;
  };
  createdAt: string;
  success: boolean;
}

const WebhookService = {
  // Get all webhooks
  async getWebhooks(sessionId?: string): Promise<Webhook[]> {
    const params = sessionId ? { sessionId } : {};
    const response = await apiClient.get('/webhooks', { params });
    return response.data;
  },
  
  // Get webhook by ID
  async getWebhook(webhookId: string): Promise<Webhook> {
    const response = await apiClient.get(`/webhooks/${webhookId}`);
    return response.data;
  },
  
  // Create new webhook
  async createWebhook(webhook: Omit<Webhook, 'id'>): Promise<Webhook> {
    const response = await apiClient.post('/webhooks', webhook);
    return response.data;
  },
  
  // Update webhook
  async updateWebhook(webhookId: string, webhook: Partial<Webhook>): Promise<Webhook> {
    const response = await apiClient.put(`/webhooks/${webhookId}`, webhook);
    return response.data;
  },
  
  // Delete webhook
  async deleteWebhook(webhookId: string): Promise<void> {
    await apiClient.delete(`/webhooks/${webhookId}`);
  },
  
  // Enable/disable webhook
  async toggleWebhook(webhookId: string, isActive: boolean): Promise<Webhook> {
    const response = await apiClient.patch(`/webhooks/${webhookId}/toggle`, { isActive });
    return response.data;
  },
  
  // Test webhook
  async testWebhook(webhookId: string): Promise<{ success: boolean, message: string }> {
    const response = await apiClient.post(`/webhooks/${webhookId}/test`);
    return response.data;
  },
  
  // Get webhook logs
  async getWebhookLogs(webhookId: string, page: number = 1, limit: number = 20): Promise<{ logs: WebhookLog[], total: number }> {
    const response = await apiClient.get(`/webhooks/${webhookId}/logs`, {
      params: { page, limit }
    });
    return response.data;
  }
};

export default WebhookService; 