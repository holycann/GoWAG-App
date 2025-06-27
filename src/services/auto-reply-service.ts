import apiClient from '../api/api';

export interface AutoReplyRule {
  id: string;
  sessionId: string;
  name: string;
  pattern: string;
  isRegex: boolean;
  response: string;
  isActive: boolean;
  priority: number;
}

export interface ScheduledMessage {
  id: string;
  sessionId: string;
  name: string;
  to: string;
  message: string;
  mediaUrl?: string;
  mediaType?: string;
  schedule: {
    type: 'once' | 'daily' | 'weekly' | 'monthly';
    time: string;
    days?: number[];
    date?: string;
  };
  isActive: boolean;
}

const AutoReplyService = {
  // Get all auto-reply rules
  async getRules(sessionId?: string): Promise<AutoReplyRule[]> {
    const params = sessionId ? { sessionId } : {};
    const response = await apiClient.get('/auto-reply/rules', { params });
    return response.data;
  },
  
  // Get rule by ID
  async getRule(ruleId: string): Promise<AutoReplyRule> {
    const response = await apiClient.get(`/auto-reply/rules/${ruleId}`);
    return response.data;
  },
  
  // Create new rule
  async createRule(rule: Omit<AutoReplyRule, 'id'>): Promise<AutoReplyRule> {
    const response = await apiClient.post('/auto-reply/rules', rule);
    return response.data;
  },
  
  // Update rule
  async updateRule(ruleId: string, rule: Partial<AutoReplyRule>): Promise<AutoReplyRule> {
    const response = await apiClient.put(`/auto-reply/rules/${ruleId}`, rule);
    return response.data;
  },
  
  // Delete rule
  async deleteRule(ruleId: string): Promise<void> {
    await apiClient.delete(`/auto-reply/rules/${ruleId}`);
  },
  
  // Enable/disable rule
  async toggleRule(ruleId: string, isActive: boolean): Promise<AutoReplyRule> {
    const response = await apiClient.patch(`/auto-reply/rules/${ruleId}/toggle`, { isActive });
    return response.data;
  },
  
  // Get all scheduled messages
  async getScheduledMessages(sessionId?: string): Promise<ScheduledMessage[]> {
    const params = sessionId ? { sessionId } : {};
    const response = await apiClient.get('/auto-reply/scheduled', { params });
    return response.data;
  },
  
  // Get scheduled message by ID
  async getScheduledMessage(messageId: string): Promise<ScheduledMessage> {
    const response = await apiClient.get(`/auto-reply/scheduled/${messageId}`);
    return response.data;
  },
  
  // Create scheduled message
  async createScheduledMessage(message: Omit<ScheduledMessage, 'id'>): Promise<ScheduledMessage> {
    const response = await apiClient.post('/auto-reply/scheduled', message);
    return response.data;
  },
  
  // Update scheduled message
  async updateScheduledMessage(messageId: string, message: Partial<ScheduledMessage>): Promise<ScheduledMessage> {
    const response = await apiClient.put(`/auto-reply/scheduled/${messageId}`, message);
    return response.data;
  },
  
  // Delete scheduled message
  async deleteScheduledMessage(messageId: string): Promise<void> {
    await apiClient.delete(`/auto-reply/scheduled/${messageId}`);
  },
  
  // Enable/disable scheduled message
  async toggleScheduledMessage(messageId: string, isActive: boolean): Promise<ScheduledMessage> {
    const response = await apiClient.patch(`/auto-reply/scheduled/${messageId}/toggle`, { isActive });
    return response.data;
  },
  
  // Test rule pattern against sample message
  async testRulePattern(pattern: string, isRegex: boolean, sampleMessage: string): Promise<boolean> {
    const response = await apiClient.post('/auto-reply/test-pattern', {
      pattern,
      isRegex,
      sampleMessage
    });
    return response.data.matches;
  }
};

export default AutoReplyService; 