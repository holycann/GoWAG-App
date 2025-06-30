import { apiClient } from "@/api/api";
import { SubscriptionTier } from "@/lib/roles";
import { 
  getLimit, 
  hasFeatureAccess, 
  checkUsageLimit, 
  calculateUsagePercentage 
} from "@/lib/subscription";

// Type definitions
export interface SubscriptionDetails {
  tier: SubscriptionTier;
  expiresAt: string;
  autoRenew: boolean;
  paymentMethod?: string;
  lastPayment?: {
    amount: number;
    date: string;
  };
}

export interface UsageMetrics {
  messages: {
    today: number;
    thisMonth: number;
    limit: number;
    percentage: number;
  };
  contacts: {
    count: number;
    limit: number;
    percentage: number;
  };
  sessions: {
    active: number;
    limit: number;
    percentage: number;
  };
  storage: {
    used: number; // in MB
    limit: number; // in MB
    percentage: number;
  };
}

// Define subscription service as a singleton
class SubscriptionService {
  private static instance: SubscriptionService;
  
  private constructor() {
    // Private constructor to prevent direct construction calls with 'new'
  }
  
  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  /**
   * Fetch the current subscription details for the authenticated user
   */
  async getCurrentSubscription(): Promise<SubscriptionDetails> {
    try {
      const response = await apiClient.get('/subscriptions/current');
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription details:', error);
      // Return default free tier if API call fails
      return {
        tier: 'free',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        autoRenew: false
      };
    }
  }

  /**
   * Get usage metrics for the current subscription
   */
  async getUsageMetrics(): Promise<UsageMetrics> {
    try {
      const response = await apiClient.get('/subscriptions/usage');
      return response.data;
    } catch (error) {
      console.error('Error fetching usage metrics:', error);
      // Return default metrics if API call fails
      return {
        messages: {
          today: 0,
          thisMonth: 0,
          limit: 0,
          percentage: 0
        },
        contacts: {
          count: 0,
          limit: 0,
          percentage: 0
        },
        sessions: {
          active: 0,
          limit: 0,
          percentage: 0
        },
        storage: {
          used: 0,
          limit: 0,
          percentage: 0
        }
      };
    }
  }

  /**
   * Check if the current subscription has access to a specific feature
   * @param feature The feature to check access for
   */
  async hasAccess(feature: string): Promise<boolean> {
    const subscription = await this.getCurrentSubscription();
    return hasFeatureAccess(subscription.tier, feature);
  }

  /**
   * Check if the current usage is within the subscription limits
   * @param limitType Type of limit to check (e.g., 'messages.perDay')
   * @param currentUsage Current usage amount
   */
  async checkLimit(limitType: string, currentUsage: number): Promise<boolean> {
    const subscription = await this.getCurrentSubscription();
    return checkUsageLimit(subscription.tier, limitType, currentUsage);
  }

  /**
   * Get the limit for a specific feature based on current subscription
   * @param limitType Type of limit to get (e.g., 'messages.perDay')
   * @param defaultValue Default value if limit is not defined
   */
  async getSubscriptionLimit(limitType: string, defaultValue: number = 0): Promise<number> {
    const subscription = await this.getCurrentSubscription();
    return getLimit(subscription.tier, limitType, defaultValue);
  }

  /**
   * Calculate usage percentage for a specific feature
   * @param limitType Type of limit to check (e.g., 'messages.perDay')
   * @param currentUsage Current usage amount
   */
  async getUsagePercentage(limitType: string, currentUsage: number): Promise<number> {
    const subscription = await this.getCurrentSubscription();
    return calculateUsagePercentage(subscription.tier, limitType, currentUsage);
  }

  /**
   * Upgrade the current subscription to a new tier
   * @param newTier The new subscription tier to upgrade to
   * @param paymentDetails Payment details for the upgrade
   */
  async upgradeSubscription(newTier: SubscriptionTier, paymentDetails: any): Promise<SubscriptionDetails> {
    try {
      const response = await apiClient.post('/subscriptions/upgrade', {
        tier: newTier,
        payment: paymentDetails
      });
      return response.data;
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      throw error;
    }
  }

  /**
   * Cancel the current subscription
   * @param reason Optional reason for cancellation
   */
  async cancelSubscription(reason?: string): Promise<void> {
    try {
      await apiClient.post('/subscriptions/cancel', { reason });
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  /**
   * Update payment method for the current subscription
   * @param paymentDetails New payment details
   */
  async updatePaymentMethod(paymentDetails: any): Promise<SubscriptionDetails> {
    try {
      const response = await apiClient.put('/subscriptions/payment-method', paymentDetails);
      return response.data;
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }
  }
}

// Export singleton instance
const subscriptionService = SubscriptionService.getInstance();
export default subscriptionService; 